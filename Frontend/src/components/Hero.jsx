import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero({ onExploreClick }) {
  const navigate = useNavigate();

  return (
    <section className="hero" aria-labelledby="hero-heading">

      {/* Background Image */}
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <h1 id="hero-heading">
          Experience the Authentic Taste of the Himalayas
        </h1>

        <p>
          Sourced from the pristine slopes of Uttarakhand, we bring you pure,
          organic treasures harvested using traditional Himalayan wisdom.
        </p>

        <div className="hero-buttons">

          <button 
            type="button" 
            className="primary-btn"
            onClick={onExploreClick}
          >
            Explore Collection
          </button>

          <button 
            type="button" 
            className="secondary-btn"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;