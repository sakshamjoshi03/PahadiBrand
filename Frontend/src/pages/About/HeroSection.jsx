import "./About.css";
import hero from "../../assets/images/hero.jpg";

export default function HeroSection() {
    return (
        <section className="about-hero">

            <img
                src={hero}
                alt="Himalayan Mountains"
                className="about-hero-image"
            />

            <div className="about-overlay"></div>

            <div className="about-hero-content">

                <span className="hero-badge">
                    ESTABLISHED IN THE VALLEYS
                </span>

                <h1>
                    Rooted in Tradition,
                    <br />
                    <span>Sourced by Nature.</span>
                </h1>

                <p>
                    Pahadi Brand is a journey back to the essentials,
                    bringing the untamed purity of the Himalayas to your
                    doorstep through time-honoured craftsmanship and
                    ancestral wisdom.
                </p>

            </div>

        </section>
    );
}