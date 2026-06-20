import "./About.css";

const values = [
    {
        number: "01",
        title: "AUTHENTICITY",
        description:
            "Every product comes directly from trusted Himalayan farmers, preserving its natural purity and traditional craftsmanship.",
    },
    {
        number: "02",
        title: "STEWARDSHIP",
        description:
            "We respect the mountains by promoting sustainable farming, responsible sourcing and eco-friendly practices.",
    },
    {
        number: "03",
        title: "TRANSPARENCY",
        description:
            "From farm to home, we maintain complete transparency so you know exactly where every product originates.",
    },
    {
        number: "04",
        title: "COMMUNITY",
        description:
            "Every purchase supports local artisans and farming families, helping preserve Himalayan livelihoods for generations.",
    },
];

export default function ValuesGrid() {
    return (
        <section className="values-section">

            <div className="values-header">

                <span className="section-subtitle">
                    OUR VALUES
                </span>

                <h2>
                    What We Stand For
                </h2>

                <p>
                    Our principles shape every product we create,
                    every partnership we build and every community
                    we support.
                </p>

            </div>

            <div className="values-grid">

                {values.map((value) => (

                    <div
                        className="value-card"
                        key={value.number}
                    >

                        <span className="value-number">
                            {value.number}
                        </span>

                        <h3>
                            {value.title}
                        </h3>

                        <p>
                            {value.description}
                        </p>

                    </div>

                ))}

            </div>

        </section>
    );
}