import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const initialFormData = {
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
};

const initialImageUrls = ["", "", "", ""];

import { createProduct } from "../../services/productService";
import { useNotifications } from "../UI/NotificationProvider";

import "./AddProductModal.css";

const getProductSaveErrorMessage = (err) => {
    if (!err.response) {
        return "Network connection lost. Please try again.";
    }

    if (err.response.status === 400) {
        return "Please check the product details and try again.";
    }

    if (err.response.status >= 500) {
        return "Product could not be created. Please try again.";
    }

    return "Product could not be created.";
};

export default function AddProductModal({

    open,

    onClose,

    onCreated,

}) {

    const [formData, setFormData] = useState(initialFormData);
    const [imageUrls, setImageUrls] = useState(initialImageUrls);

    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [saving, setSaving] = useState(false);
    const { addNotification } = useNotifications();

    const formIsValid =
        formData.name.trim() &&
        formData.category.trim() &&
        Number(formData.price) > 0 &&
        Number(formData.stock) >= 0;

    if (!open) return null;

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

    const handleImageUrlChange = (index, value) => {
        const nextImages = [...imageUrls];
        nextImages[index] = value;
        setImageUrls(nextImages);
        setSubmitError("");
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setImageUrls(initialImageUrls);
        setErrors({});
        setSubmitError("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const addFeature = () => {

        setFormData({

            ...formData,

            features: [...formData.features, ""],

        });

    };

    const addSpecification = () => {

        setFormData({

            ...formData,

            specifications: [...formData.specifications, ""],

        });

    };

    const updateFeature = (index, value) => {

        const arr = [...formData.features];

        arr[index] = value;

        setFormData({

            ...formData,

            features: arr,

        });

    };

    const updateSpecification = (index, value) => {

        const arr = [...formData.specifications];

        arr[index] = value;

        setFormData({

            ...formData,

            specifications: arr,

        });

    };

    const removeFeature = (index) => {

        setFormData({

            ...formData,

            features: formData.features.filter((_, i) => i !== index),

        });

    };

    const removeSpecification = (index) => {

        setFormData({

            ...formData,

            specifications: formData.specifications.filter((_, i) => i !== index),

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (saving) return;

        if (!validate()) return;

        setSubmitError("");
        setSaving(true);

        try {
            const normalizedImages = imageUrls
                .map((url, index) => {
                    const trimmedUrl = url.trim();

                    if (!trimmedUrl) {
                        return null;
                    }

                    return {
                        url: trimmedUrl,
                        alt: `${formData.name.trim() || "Product"} image ${index + 1}`,
                        isPrimary: index === 0,
                    };
                })
                .filter(Boolean);

            const normalizedSpecs = formData.specifications
                .filter(Boolean)
                .map(spec => {
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

            await createProduct({
                ...formData,
                images: normalizedImages,
                features: formData.features.filter(Boolean),
                specifications: normalizedSpecs,
                sustainability: normalizedSustainability,
            });
            addNotification("Product created successfully.", "success");
            resetForm();
            onCreated();
            onClose();

        }

        catch (err) {

            setSubmitError(getProductSaveErrorMessage(err));

        }

        finally {

            setSaving(false);

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

                    <h2>Add Product</h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={handleClose}
                        aria-label="Close add product dialog"
                    >

                        <X/>

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

                    <label htmlFor="add-product-name" className="sr-only">Product name</label>
                    <input
                        id="add-product-name"
                        placeholder="Product Name"

                        name="name"

                        value={formData.name}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    {errors.name && (
                        <span className="modal-field-error">
                            {errors.name}
                        </span>
                    )}

                    <label htmlFor="add-product-category" className="sr-only">Category</label>
                    <input
                        id="add-product-category"
                        placeholder="Category"

                        name="category"

                        value={formData.category}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    {errors.category && (
                        <span className="modal-field-error">
                            {errors.category}
                        </span>
                    )}

                    <label htmlFor="add-product-price" className="sr-only">Price</label>
                    <input
                        id="add-product-price"
                        placeholder="Price"

                        type="number"

                        name="price"

                        value={formData.price}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    {errors.price && (
                        <span className="modal-field-error">
                            {errors.price}
                        </span>
                    )}

                    <label htmlFor="add-product-stock" className="sr-only">Stock</label>
                    <input
                        id="add-product-stock"
                        placeholder="Stock"

                        type="number"

                        name="stock"

                        value={formData.stock}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    {errors.stock && (
                        <span className="modal-field-error">
                            {errors.stock}
                        </span>
                    )}

                    <label htmlFor="add-product-description" className="sr-only">Description</label>
                    <textarea
                        id="add-product-description"
                        placeholder="Description"

                        rows="4"

                        name="description"

                        value={formData.description}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    <label htmlFor="add-product-origin" className="sr-only">Origin</label>
                    <input
                        id="add-product-origin"
                        placeholder="Origin"

                        name="origin"

                        value={formData.origin}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    <label htmlFor="add-product-harvest" className="sr-only">Harvest season</label>
                    <input
                        id="add-product-harvest"
                        placeholder="Harvest Season"

                        name="harvestSeason"

                        value={formData.harvestSeason}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    <label htmlFor="add-product-sustainability" className="sr-only">Sustainability</label>
                    <textarea
                        id="add-product-sustainability"
                        placeholder="Sustainability"

                        rows="3"

                        name="sustainability"

                        value={formData.sustainability}

                        onChange={handleChange}

                        disabled={saving}

                    />

                    <h3>Product Images</h3>
                    <p className="image-help">
                        Add up to four image URLs so the product will show a full gallery on its detail page.
                    </p>

                    {imageUrls.map((imageUrl, index) => (
                        <div className="image-input-row" key={index}>
                            <label htmlFor={`image-${index + 1}`} className="sr-only">
                                Image {index + 1}
                            </label>
                            <input
                                id={`image-${index + 1}`}
                                type="url"
                                placeholder={`Image ${index + 1} URL`}
                                value={imageUrl}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                disabled={saving}
                            />
                        </div>
                    ))}

                    <h3>Features</h3>

                    {

                        formData.features.map((feature,index)=>(

                            <div

                                className="dynamic-input"

                                key={index}

                            >

                                <input

                                    value={feature}

                                    onChange={(e)=>updateFeature(index,e.target.value)}

                                    disabled={saving}

                                />

                                <button

                                    type="button"

                                    className="remove-btn"

                                    onClick={()=>removeFeature(index)}

                                    disabled={saving}

                                >

                                    <Trash2 size={16}/>

                                </button>

                            </div>

                        ))

                    }

                    <button

                        type="button"

                        className="add-btn"

                        onClick={addFeature}

                        disabled={saving}

                    >

                        <Plus size={16}/>

                        Add Feature

                    </button>

                    <h3>Specifications</h3>

                    {

                        formData.specifications.map((spec,index)=>(

                            <div

                                className="dynamic-input"

                                key={index}

                            >

                                <input

                                    value={spec}

                                    onChange={(e)=>updateSpecification(index,e.target.value)}

                                    disabled={saving}

                                />

                                <button

                                    type="button"

                                    className="remove-btn"

                                    onClick={()=>removeSpecification(index)}

                                    disabled={saving}

                                >

                                    <Trash2 size={16}/>

                                </button>

                            </div>

                        ))

                    }

                    <button

                        type="button"

                        className="add-btn"

                        onClick={addSpecification}

                        disabled={saving}

                    >

                        <Plus size={16}/>

                        Add Specification

                    </button>

                    <div className="modal-actions">

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={handleClose}

                            disabled={saving}

                        >

                            Cancel

                        </button>

                        <button

                            className="save-btn"

                            type="submit"

                            disabled={saving || !formIsValid}

                        >

                            {saving ? "Saving Product..." : "Create Product"}

                        </button>

                    </div>

                </form>

            </div>

        </>

    );

}
