import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

import { updateProduct } from "../../services/productService";
import { useNotifications } from "../UI/NotificationProvider";

import "./ProductModal.css";

const getProductUpdateErrorMessage = (error) => {
    if (!error.response) {
        return "Network connection lost. Please try again.";
    }

    if (error.response.status === 400) {
        return "Please check the product details and try again.";
    }

    if (error.response.status === 404) {
        return "Product could not be found.";
    }

    if (error.response.status >= 500) {
        return "Product could not be updated. Please try again.";
    }

    return "Product could not be updated.";
};

export default function ProductModal({

    open,

    product,

    onClose,

    onUpdated,

}) {

    const [formData, setFormData] = useState({

        name: "",

        category: "",

        price: "",

        stock: "",

        description: "",

        origin: "",

        harvestSeason: "",

        sustainability: "",

        features: [],

        specifications: [],

    });

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [updating, setUpdating] = useState(false);
    const { addNotification } = useNotifications();

    const formIsValid =
        formData.name.trim() &&
        formData.category.trim() &&
        Number(formData.price) > 0 &&
        Number(formData.stock) >= 0;

    useEffect(() => {

        if (product) {

            const sustainabilityStr = (product.sustainability && typeof product.sustainability === "object")
                ? (product.sustainability.description || product.sustainability.title || "")
                : (product.sustainability || "");

            const specsStrArr = (product.specifications || []).map(spec => {
                if (spec && typeof spec === "object") {
                    return `${spec.key}: ${spec.value}`;
                }
                return spec || "";
            });

            setFormData({

                name: product.name || "",

                category: product.category || "",

                price: product.price || "",

                stock: product.stock || "",

                description: product.description || "",

                origin: product.origin || "",

                harvestSeason: product.harvestSeason || "",

                sustainability: sustainabilityStr,

                features: product.features || [],

                specifications: specsStrArr,

            });

            setErrors({});
            setSubmitError("");

        }

    }, [product]);

    if (!open || !product) return null;

    const validate = () => {
        const nextErrors = {};

        if (!formData.name.trim()) {
            nextErrors.name = "Product name is required.";
        }

        if (!formData.category.trim()) {
            nextErrors.category = "Category is required.";
        }

        if (formData.price === "" || Number(formData.price) <= 0) {
            nextErrors.price = "Price must be greater than zero.";
        }

        if (formData.stock === "" || Number(formData.stock) < 0) {
            nextErrors.stock = "Stock cannot be negative.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

        setSubmitError("");
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

    };

    const handleFeatureChange = (index, value) => {

        const updated = [...formData.features];

        updated[index] = value;

        setFormData({

            ...formData,

            features: updated,

        });

    };

    const handleSpecificationChange = (index, value) => {

        const updated = [...formData.specifications];

        updated[index] = value;

        setFormData({

            ...formData,

            specifications: updated,

        });

    };

    const addFeature = () => {

        setFormData({

            ...formData,

            features: [...formData.features, ""],

        });

    };

    const removeFeature = (index) => {

        setFormData({

            ...formData,

            features: formData.features.filter(

                (_, i) => i !== index

            ),

        });

    };

    const addSpecification = () => {

        setFormData({

            ...formData,

            specifications: [

                ...formData.specifications,

                "",

            ],

        });

    };

    const removeSpecification = (index) => {

        setFormData({

            ...formData,

            specifications:

                formData.specifications.filter(

                    (_, i) => i !== index

                ),

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (updating) return;

        if (!validate()) return;

        setSubmitError("");
        setUpdating(true);

        try {

            const normalizedSpecs = formData.specifications
                .filter(Boolean)
                .map(spec => {
                    if (spec && typeof spec === "object") {
                        return spec;
                    }
                    const idx = spec.indexOf(":");
                    if (idx !== -1) {
                        return {
                            key: spec.substring(0, idx).trim(),
                            value: spec.substring(idx + 1).trim()
                        };
                    }
                    return { key: "Detail", value: spec.trim() };
                });

            const normalizedSustainability = formData.sustainability.trim()
                ? { title: "Sustainability Commitment", description: formData.sustainability.trim() }
                : { title: "", description: "" };

            await updateProduct(

                product._id,

                {
                    ...formData,
                    features: formData.features.filter(Boolean),
                    specifications: normalizedSpecs,
                    sustainability: normalizedSustainability
                }

            );

            await Promise.resolve(onUpdated());

            onClose();

        }

        catch (error) {

            setSubmitError(getProductUpdateErrorMessage(error));

        }

        finally {

            setUpdating(false);

        }

    };

    return (

        <>

            <div

                className="modal-overlay"

                onClick={onClose}

            />

            <div className="product-modal">

                <div className="modal-header">

                    <h2>

                        Edit Product

                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                        disabled={updating}
                        aria-label="Close edit product dialog"

                    >

                        <X size={22} />

                    </button>

                </div>

                    <form

                    className="modal-form"

                    onSubmit={handleSubmit}

                >

                    {submitError && (
                        <div className="modal-error">
                            {submitError}
                        </div>
                    )}

                    <div className="form-group">

                        <label htmlFor="edit-product-name">

                            Product Name

                        </label>

                        <input
                            id="edit-product-name"
                            type="text"

                            name="name"

                            value={formData.name}

                            onChange={handleChange}

                            disabled={updating}

                        />

                        {errors.name && (
                            <span className="modal-field-error">
                                {errors.name}
                            </span>
                        )}

                    </div>

                    <div className="form-group">

                        <label htmlFor="edit-product-category">

                            Category

                        </label>

                        <input
                            id="edit-product-category"
                            type="text"

                            name="category"

                            value={formData.category}

                            onChange={handleChange}

                            disabled={updating}

                        />

                        {errors.category && (
                            <span className="modal-field-error">
                                {errors.category}
                            </span>
                        )}

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label htmlFor="edit-product-price">

                                Price

                            </label>

                            <input
                                id="edit-product-price"
                                type="number"

                                name="price"

                                value={formData.price}

                                onChange={handleChange}

                                disabled={updating}

                            />

                            {errors.price && (
                                <span className="modal-field-error">
                                    {errors.price}
                                </span>
                            )}

                        </div>

                        <div className="form-group">

                            <label htmlFor="edit-product-stock">

                                Stock

                            </label>

                            <input
                                id="edit-product-stock"
                                type="number"

                                name="stock"

                                value={formData.stock}

                                onChange={handleChange}

                                disabled={updating}

                            />

                            {errors.stock && (
                                <span className="modal-field-error">
                                    {errors.stock}
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="form-group">

                        <label htmlFor="edit-product-description">

                            Description

                        </label>

                        <textarea
                            id="edit-product-description"

                            rows="4"

                            name="description"

                            value={formData.description}

                            onChange={handleChange}

                            disabled={updating}

                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="edit-product-origin">

                            Origin

                        </label>

                        <input
                            id="edit-product-origin"

                            type="text"

                            name="origin"

                            value={formData.origin}

                            onChange={handleChange}

                            disabled={updating}

                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="edit-product-harvest">

                            Harvest Season

                        </label>

                        <input
                            id="edit-product-harvest"

                            type="text"

                            name="harvestSeason"

                            value={formData.harvestSeason}

                            onChange={handleChange}

                            disabled={updating}

                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="edit-product-sustainability">

                            Sustainability

                        </label>

                        <textarea
                            id="edit-product-sustainability"

                            rows="3"

                            name="sustainability"

                            value={formData.sustainability}

                            onChange={handleChange}

                            disabled={updating}

                        />
                    </div>

                    <div className="form-group">

                        <div className="section-header">

                            <label>

                                Features

                            </label>

                            <button

                                type="button"

                                className="add-btn"

                                onClick={addFeature}

                                disabled={updating}

                            >

                                <Plus size={16} />

                                Add

                            </button>

                        </div>

                        {

                            formData.features.map((feature, index) => (

                                <div

                                    className="dynamic-input"

                                    key={index}

                                >

                                    <input

                                        type="text"

                                        value={feature}

                                        onChange={(e) =>

                                            handleFeatureChange(

                                                index,

                                                e.target.value

                                            )

                                        }

                                        disabled={updating}

                                    />

                                    <button

                                        type="button"

                                        className="remove-btn"

                                        onClick={() =>

                                            removeFeature(index)

                                        }

                                        disabled={updating}

                                    >

                                        <Trash2 size={16} />

                                    </button>

                                </div>

                            ))

                        }

                    </div>

                    <div className="form-group">

                        <div className="section-header">

                            <label>

                                Specifications

                            </label>

                            <button

                                type="button"

                                className="add-btn"

                                onClick={addSpecification}

                                disabled={updating}

                            >

                                <Plus size={16} />

                                Add

                            </button>

                        </div>

                        {

                            formData.specifications.map(

                                (specification, index) => (

                                    <div

                                        className="dynamic-input"

                                        key={index}

                                    >

                                        <input

                                            type="text"

                                            value={specification}

                                            onChange={(e) =>

                                                handleSpecificationChange(

                                                    index,

                                                    e.target.value

                                                )

                                            }

                                            disabled={updating}

                                        />

                                        <button

                                            type="button"

                                            className="remove-btn"

                                            onClick={() =>

                                                removeSpecification(index)

                                            }

                                            disabled={updating}

                                        >

                                            <Trash2 size={16} />

                                        </button>

                                    </div>

                                )

                            )

                        }

                    </div>

                    <div className="modal-actions">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={onClose}

                            disabled={updating}

                        >

                            Cancel

                        </button>

                        <button

                            type="submit"

                            className="save-btn"

                            disabled={updating || !formIsValid}

                        >

                            {updating ? "Updating..." : "Save Changes"}

                        </button>

                    </div>

                </form>

            </div>

        </>

    );

}
