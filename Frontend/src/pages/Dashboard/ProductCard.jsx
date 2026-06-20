import "./Dashboard.css";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({
    image,
    name,
    category,
    price,
    rating = 4.8,
}) {
    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={image}
                    alt={name}
                    className="product-image"
                />
            </div>

            <div className="product-content">

                <span className="product-category">
                    {category}
                </span>

                <h3>{name}</h3>

                <div className="product-rating">
                    <Star
                        size={16}
                        fill="#F4B400"
                        color="#F4B400"
                    />

                    <span>{rating}</span>
                </div>

                <div className="product-footer">

                    <h4>₹{price}</h4>

                    <button className="product-btn">
                        <ShoppingCart size={18} />
                    </button>

                </div>

            </div>
        </div>
    );
}