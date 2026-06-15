import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Background Image */}
      <div className="hero-overlay"></div>

      <div className="hero-content">

        <h1>
          Experience the Authentic Taste of the Himalayas
        </h1>

        <p>
          Sourced from the pristine slopes of Uttarakhand, we bring you pure,
          organic treasures harvested using traditional Himalayan wisdom.
        </p>

        <div className="hero-buttons">

          <button className="primary-btn">
            Explore Collection
          </button>

          <button className="secondary-btn">
            Learn More
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;