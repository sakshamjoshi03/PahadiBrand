import { Leaf } from "lucide-react";

const SustainabilityCard = ({ sustainability }) => {

    if (!sustainability) return null;

    return (

        <div className="sustainability-card">

            <div className="sustainability-header">

                <Leaf
                    size={24}
                    color="#0a5b2a"
                />

                <h2>
                    {sustainability.title}
                </h2>

            </div>

            <p>
                {sustainability.description}
            </p>

        </div>

    );

};

export default SustainabilityCard;