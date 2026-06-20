import Hero from "../components/Hero";
import Card from "../components/Card";
import buranshImg from "../assets/images/buransh.jpg";
import honeyImg from "../assets/images/honey.jpg";
import manduaImg from "../assets/images/mandua.jpg";
import rajmaImg from "../assets/images/rajma.jpg";
import "./Home.css";

export default function Home() {
  const products = [
    {
      image: buranshImg,
      title: "Buransh Juice",
      description: "Refreshing Rhododendron Nectar",
      price: "₹450",
      tag: "Organic"
    },
    {
      image: honeyImg,
      title: "Himalayan Honey",
      description: "Wild Multiflora Forest Honey",
      price: "₹850",
      tag: "Wild Harvest"
    },
    {
      image: manduaImg,
      title: "Mandua Flour",
      description: "Stone Ground Finger Millet",
      price: "₹120",
      tag: "" // No tag visible in the screenshot
    },
    {
      image: rajmaImg,
      title: "Pahadi Rajma",
      description: "High Altitude Kidney Beans",
      price: "₹220",
      tag: "Top Seller"
    }
  ];

  return (
    <div className="home-container">
      <Hero />
      
      <section className="collections-section">
        <span className="collections-subtitle">MOUNTAIN HARVEST</span>
        <h2 className="collections-title">Our Signature Collections</h2>
        
        <div className="products-grid">
          {products.map((product, idx) => (
            <Card
              key={idx}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              tag={product.tag}
            />
          ))}
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-item">
            <span className="feature-icon">🌿</span>
            <span className="feature-text">100% Organic</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🛍️</span>
            <span className="feature-text">Direct From Villages</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">❤️</span>
            <span className="feature-text">Supporting Farmers</span>
          </div>
        </div>
      </section>
    </div>
  );
}
