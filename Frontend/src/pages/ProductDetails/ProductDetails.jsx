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

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [loading, setLoading] = useState(true);

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

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <h2
                style={{
                    textAlign: "center",
                    marginTop: "120px",
                }}
            >
                Loading Product...
            </h2>

        );

    }

    if (!product) {

        return (

            <h2
                style={{
                    textAlign: "center",
                    marginTop: "120px",
                }}
            >
                Product Not Found
            </h2>

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