import "./About.css";
import story from "../../assets/images/story.png";

export default function StorySection() {
    return (
        <section className="story-section">

            <div className="story-image">

                <img
                    src={story}
                    alt="Our Story"
                />

            </div>

            <div className="story-content">

                <span className="section-subtitle">
                    OUR STORY
                </span>

                <h2>
                    Rooted in the
                    <br />
                    Himalayas.
                </h2>

                <p className="story-description">

                    Pahadi Brand began not as a business,
                    but as a commitment to preserve the
                    timeless traditions of the Garhwal
                    and Kumaon Himalayas.

                </p>

                <p className="story-description">

                    We work directly with mountain
                    farmers and artisans, ensuring
                    every product reflects authenticity,
                    sustainability and generations of
                    inherited knowledge.

                </p>

                <div className="story-features">

                    <div className="story-feature">

                        <h3>Traditional Farming</h3>

                        <p>

                            Ancient cultivation methods,
                            organic practices and local
                            craftsmanship preserved for
                            future generations.

                        </p>

                    </div>

                    <div className="story-feature">

                        <h3>Ethically Sourced</h3>

                        <p>

                            Every product is sourced
                            responsibly, ensuring fair
                            trade, transparency and
                            community empowerment.

                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}