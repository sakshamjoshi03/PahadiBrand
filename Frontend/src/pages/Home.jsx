import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import Card from "../components/Card";

import { getAllProducts } from "../services/productService";

import buranshImg from "../assets/images/buransh.jpg";
import honeyImg from "../assets/images/honey.jpg";
import manduaImg from "../assets/images/mandua.jpg";
import rajmaImg from "../assets/images/rajma.jpg";

import "./Home.css";

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const imageMap = {
    "buransh.jpg": buranshImg,
    "honey.jpg": honeyImg,
    "mandua.jpg": manduaImg,
    "rajma.jpg": rajmaImg,
    "apricot-oil.jpg": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    "jhangora.jpg": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  };

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
      <h2 style={{ textAlign: "center", marginTop: "150px", color: "red" }}>
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

            <Card
              key={product.id}
              image={imageMap[product.image] || buranshImg}
              title={product.name}
              description={product.description}
              price={`₹${product.price}`}
              tag={product.category}
            />

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