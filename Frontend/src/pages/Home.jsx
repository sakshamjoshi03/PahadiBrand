import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Hero from "../components/Hero";
import Card from "../components/Card";
import EmptyState from "../components/AI/EmptyState";
import { PackageSearch } from "lucide-react";

import { getAllProducts } from "../services/productService";

import "./Home.css";

const getProductsErrorMessage = (err) => {
    if (!err.response) {
        return "Network connection lost. Please check your internet and try again.";
    }

    if (err.response.status >= 500) {
        return "Unable to load products. Please try again.";
    }

    return "Unable to load products.";
};

export default function Home() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const filteredProducts = products.filter((product) => {
        const query = searchQuery.toLowerCase();
        return (
            product.name?.toLowerCase().includes(query) ||
            product.category?.toLowerCase().includes(query) ||
            product.description?.toLowerCase().includes(query)
        );
    });

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await getAllProducts();

                setProducts(Array.isArray(response.data) ? response.data : []);

            } catch (err) {

                setError(getProductsErrorMessage(err));

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    const handleExploreClick = () => {
        const collectionsSection = document.querySelector(".collections-section");
        if (collectionsSection) {
            collectionsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (loading) {

        return (
            <h2 style={{ textAlign: "center", marginTop: "150px" }}>
                Loading Products...
            </h2>
        );

    }

    if (error) {

        return (
            <div className="home-state">
                <h2>{error}</h2>
                <p>Please try again in a moment.</p>
            </div>
        );

    }
    if (products.length === 0) {
        return (
            <div className="home-state">
                <EmptyState
                    icon={PackageSearch}
                    title="No products available"
                    description="We’re adding new Himalayan products soon. Please check back later for fresh arrivals."
                />
            </div>
        );
    }

    return (

        <div className="home-container">

            <Hero onExploreClick={handleExploreClick} />

            <section className="collections-section">

                <span className="collections-subtitle">
                    MOUNTAIN HARVEST
                </span>

                <h2 className="collections-title">
                    Our Signature Collections
                </h2>

                {filteredProducts.length === 0 ? (
                    <div style={{ padding: "40px 0", width: "100%" }}>
                        <EmptyState
                            icon={PackageSearch}
                            title="No matching products found"
                            description={`We couldn't find any products matching "${searchQuery}". Try adjusting your keywords.`}
                        />
                    </div>
                ) : (
                    <div className="products-grid">

                        {filteredProducts.map((product) => (

                            <div
                                key={product._id}
                                className="product-card-item"
                                onClick={() => navigate(`/products/${product._id}`)}
                            >

                                <Card
                                    product={product}
                                    image={
                                        product.images?.find(
                                            (img) => img.isPrimary
                                        )?.url ||
                                        product.images?.[0]?.url ||
                                        "/product-images/buransh/main.png"
                                    }
                                    title={product.name}
                                    description={product.description}
                                    price={`₹${product.price}`}
                                    tag={product.category}
                                />

                            </div>

                        ))}

                    </div>
                )}

            </section>

            <section className="features-section">

                <div className="features-container">

                    <div className="feature-item">

                        <span className="feature-icon">🌿</span>

                        <span className="feature-text">
                            100% Organic
                        </span>

                    </div>

                    <div className="feature-item">

                        <span className="feature-icon">🛍️</span>

                        <span className="feature-text">
                            Direct From Villages
                        </span>

                    </div>

                    <div className="feature-item">

                        <span className="feature-icon">❤️</span>

                        <span className="feature-text">
                            Supporting Farmers
                        </span>

                    </div>

                </div>

            </section>

        </div>

    );

}
