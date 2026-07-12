import { CheckCircle2 } from "lucide-react";

const ProductFeatures = ({ features = [] }) => {

    if (!features.length) return null;

    return (

        <div className="product-features">

            <h2 className="section-title">
                Features
            </h2>

            <div className="features-list">

                {features.map((feature, index) => (

                    <div
                        key={index}
                        className="feature-item"
                    >

                        <CheckCircle2
                            size={18}
                            color="#0a5b2a"
                        />

                        <span>{feature}</span>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default ProductFeatures;