import "./Dashboard.css";

import hero from "../../assets/images/hero.jpg";
import buransh from "../../assets/images/buransh.jpg";
import honey from "../../assets/images/honey.jpg";
import mandua from "../../assets/images/mandua.jpg";

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

export default function Dashboard() {

  const stats = [
    {
      icon: ShoppingBag,
      value: "03",
      label: "Orders",
      color: "#2E7D32",
    },
    {
      icon: Heart,
      value: "12",
      label: "Wishlist",
      color: "#E91E63",
    },
    {
      icon: Award,
      value: "250",
      label: "Reward Points",
      color: "#F9A825",
    },
    {
      icon: Bookmark,
      value: "05",
      label: "Saved",
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

  const products = [
    {
      image: buransh,
      name: "Buransh Juice",
      category: "Beverages",
      price: 349,
      rating: 4.9,
    },
    {
      image: honey,
      name: "Wild Honey",
      category: "Organic",
      price: 499,
      rating: 4.8,
    },
    {
      image: mandua,
      name: "Mandua Flour",
      category: "Healthy Grains",
      price: 249,
      rating: 4.7,
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

        {products.map((item, index) => (
          <ProductCard key={index} {...item} />
        ))}

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