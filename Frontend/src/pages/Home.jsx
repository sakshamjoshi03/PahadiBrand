import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../components/Hero";
import Card from "../components/Card";

import { getAllProducts } from "../services/productService";

import "./Home.css";

export default function Home() {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                const response = await getAllProducts();

                setProducts(response.data);

            } catch (err) {

                console.error(err);

                setError("Unable to load products.");

            } finally {

                setLoading(false);

            }

        };

        fetchProducts();

    }, []);

    if (loading) {

        return (
            <h2 style={{ textAlign: "center", marginTop: "150px" }}>
                Loading Products...
            </h2>
        );

    }

    if (error) {

        return (
            <h2
                style={{
                    textAlign: "center",
                    marginTop: "150px",
                    color: "red",
                }}
            >
                {error}
            </h2>
        );

    }

    return (

        <div className="home-container">

            <Hero />

            <section className="collections-section">

                <span className="collections-subtitle">
                    MOUNTAIN HARVEST
                </span>

                <h2 className="collections-title">
                    Our Signature Collections
                </h2>

                <div className="products-grid">

                    {products.map((product) => (

                        <div
                            key={product._id}
                            onClick={() => navigate(`/products/${product._id}`)}
                            style={{ cursor: "pointer" }}
                        >

                            <Card
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