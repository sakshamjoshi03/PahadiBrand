import { useEffect, useState } from "react";
import "./Dashboard.css";

import hero from "../../assets/images/hero.jpg";
import buransh from "../../assets/images/buransh.jpg";
import honey from "../../assets/images/honey.jpg";
import mandua from "../../assets/images/mandua.jpg";
import rajma from "../../assets/images/rajma.jpg";

import {
  ShoppingBag,
  Heart,
  Award,
  Bookmark,
  Package,
  User,
  Truck,
} from "lucide-react";

import StatsCard from "./StatsCard";
import QuickAction from "./QuickAction";
import ProductCard from "./ProductCard";
import UpdateCard from "./UpdateCard";
import { getAllProducts } from "../../services/productService";

export default function Dashboard() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageMap = {
    "buransh.jpg": buransh,
    "honey.jpg": honey,
    "mandua.jpg": mandua,
    "rajma.jpg": rajma,
    "apricot-oil.jpg": "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
    "jhangora.jpg": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80"
  };

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const response = await getAllProducts();

        setProducts(response.data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);

  const stats = [

    {
      icon: ShoppingBag,
      value: loading ? "..." : products.length,
      label: "Products",
      color: "#2E7D32",
    },

    {
      icon: Heart,
      value: loading
        ? "..."
        : [...new Set(products.map(p => p.category))].length,
      label: "Categories",
      color: "#E91E63",
    },

    {
      icon: Award,
      value: loading
        ? "..."
        : products.length > 0
          ? (
              products.reduce((sum, p) => sum + p.rating, 0) /
              products.length
            ).toFixed(1)
          : "0.0",
      label: "Avg Rating",
      color: "#F9A825",
    },

    {
      icon: Bookmark,
      value: loading
        ? "..."
        : products.reduce((sum, p) => sum + p.stock, 0),
      label: "Total Stock",
      color: "#3949AB",
    },

  ];

  const quickActions = [
    {
      icon: ShoppingBag,
      title: "Explore Products",
      subtitle: "Browse Himalayan collection",
    },
    {
      icon: Heart,
      title: "Wishlist",
      subtitle: "View saved favourites",
    },
    {
      icon: Truck,
      title: "Track Orders",
      subtitle: "Check delivery status",
    },
    {
      icon: User,
      title: "Profile",
      subtitle: "Manage your account",
    },
  ];

  const updates = [
    {
      title: "Buransh Season Begins",
      description:
        "Fresh Buransh flowers have arrived from the Himalayas. Discover our seasonal collection.",
      date: "Today",
    },
    {
      title: "Free Shipping",
      description:
        "Enjoy free shipping on every order above ₹999 anywhere in India.",
      date: "2 Days Ago",
    },
    {
      title: "Organic Collection",
      description:
        "Explore our newly launched herbal teas and mountain spices.",
      date: "This Week",
    },
  ];

  return (
    <div className="dashboard-page">

      {/* Header */}

      <div className="dashboard-header">

        <span className="dashboard-tag">
          MEMBER AREA
        </span>

        <h1>Dashboard</h1>

      </div>

      {/* Welcome */}

      <div className="welcome-card">

        <div>

          <h2>
            👋 Welcome Back, Saksham
          </h2>

          <p>
            Premium Himalayan products await you.
            Continue your journey with Pahadi Brand.
          </p>

          <div className="welcome-buttons">

            <button className="primary-btn">
              Explore Products
            </button>

            <button className="secondary-btn">
              My Orders
            </button>

          </div>

        </div>

        <div className="member-badge">

          <span>Member Since</span>

          <h3>June 2026</h3>

        </div>

      </div>

      {/* Stats */}

      <div className="stats-grid">

        {stats.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}

      </div>

      {/* Banner */}

      <div className="hero-banner">

        <img src={hero} alt="hero" />

        <div className="hero-overlay">

          <h2>
            Experience Pure Himalayan Living
          </h2>

          <p>
            Discover authentic products directly
            from the mountains.
          </p>

          <button className="primary-btn">
            Explore Collection
          </button>

        </div>

      </div>

      {/* Quick Actions */}

      <h2 className="section-title">
        Quick Actions
      </h2>

      <div className="quick-actions-grid">

        {quickActions.map((item, index) => (
          <QuickAction key={index} {...item} />
        ))}

      </div>

      {/* Products */}

      <h2 className="section-title">
        Recently Viewed
      </h2>

      <div className="products-grid">

        {loading ? (

          <p
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "600"
            }}
          >
            Loading Products...
          </p>

        ) : (

          products.slice(0, 3).map((item) => (

            <ProductCard

              key={item.id}

              image={imageMap[item.image] || buransh}

              name={item.name}

              category={item.category}

              price={item.price}

              rating={item.rating}

            />

          ))

        )}

      </div>

      {/* Updates */}

      <div className="updates-section">

        <h2 className="section-title">
          Community Updates
        </h2>

        <div className="updates-grid">

          {updates.map((item, index) => (
            <UpdateCard key={index} {...item} />
          ))}

        </div>

      </div>

    </div>
  );
}