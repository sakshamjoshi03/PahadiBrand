import { useState } from "react";
import "./Dashboard.css";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

export default function ProductCard({
    product,
    image,
    name,
    category,
    price,
    rating = 4.8,
}) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const itemToAdd = product || {
            name,
            image,
            category,
            price,
            rating,
        };
        addToCart(itemToAdd, 1);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1200);
    };

    return (
        <div className="product-card">
            <div className="product-image-wrapper">
                <img
                    src={image}
                    alt={`${name} preview`}
                    className="product-image"
                    loading="lazy"
                />
            </div>

            <div className="product-content">
                <span className="product-category">
                    {category}
                </span>

                <h3 title={name}>{name}</h3>

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

                    <button
                        className={`product-btn ${isAdded ? "added" : ""}`}
                        onClick={handleAddToCart}
                        aria-label={`Add ${name} to cart`}
                        title={`Add ${name} to cart`}
                    >
                        {isAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
}