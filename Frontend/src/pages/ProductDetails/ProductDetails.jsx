import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
    getProductById,
    getRelatedProducts,
} from "../../services/productService";

import ProductGallery from "../../components/ProductDetails/ProductGallery";
import ProductInfo from "../../components/ProductDetails/ProductInfo";
import ProductFeatures from "../../components/ProductDetails/ProductFeatures";
import ProductSpecifications from "../../components/ProductDetails/ProductSpecifications";
import SustainabilityCard from "../../components/ProductDetails/SustainabilityCard";
import RelatedProducts from "../../components/ProductDetails/RelatedProducts";

import "../../components/ProductDetails/ProductDetails.css";

const getProductDetailsErrorMessage = (error) => {
    if (!error.response) {
        return "Network connection lost. Please check your internet and try again.";
    }

    if (error.response.status === 404) {
        return "Product Not Found";
    }

    if (error.response.status >= 500) {
        return "Unable to load product details. Please try again.";
    }

    return "Product could not be loaded.";
};

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {

        loadProduct();

    }, [id]);

    const loadProduct = async () => {

        try {

            setLoading(true);

            const productData = await getProductById(id);

            setProduct(productData);

            const related = await getRelatedProducts(
                productData.category,
                productData._id
            );

            setRelatedProducts(related);
            setError("");

        } catch (error) {

            setError(getProductDetailsErrorMessage(error));
            setProduct(null);
            setRelatedProducts([]);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="product-details-state">
                <h2>Loading Product...</h2>
                <p>Please wait while we fetch the product details.</p>
            </div>

        );

    }

    if (error) {

        return (

            <div className="product-details-state error-state">
                <h2>{error}</h2>
                <p>Please try again in a moment.</p>
            </div>

        );

    }

    if (!product) {

        return (

            <div className="product-details-state">
                <h2>Product Not Found</h2>
                <p>This product may no longer be available.</p>
            </div>

        );

    }

    return (

        <div className="product-details-page">

            <div className="product-top-section">

                <ProductGallery
                    images={product.images}
                />

                <ProductInfo
                    product={product}
                    onQuantityChange={setSelectedQuantity}
                />

            </div>

            <ProductFeatures
                features={product.features}
            />

            <ProductSpecifications
                specifications={product.specifications}
            />

            <SustainabilityCard
                sustainability={product.sustainability}
            />

            <RelatedProducts
                products={relatedProducts}
            />

        </div>

    );

};

export default ProductDetails;
