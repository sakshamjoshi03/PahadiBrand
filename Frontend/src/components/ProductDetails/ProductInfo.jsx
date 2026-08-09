import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

const ProductInfo = ({ product, onQuantityChange }) => {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);

    if (!product) return null;

    const handleQuantityChange = (qty) => {
        setQuantity(qty);
        if (onQuantityChange) {
            onQuantityChange(qty);
        }
    };

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1400);
    };

    return (
        <div className="product-info">
            <p className="product-category">
                {product.category}
            </p>

            <h1 className="product-title">
                {product.name}
            </h1>

            <div className="product-rating">
                <Star
                    size={18}
                    fill="#F4B400"
                    color="#F4B400"
                />

                <span className="rating-value">
                    {product.rating}
                </span>

                <span className="review-count">
                    ({product.reviewCount || 0} Reviews)
                </span>
            </div>

            <h2 className="product-price">
                ₹{product.price}
            </h2>

            <p className="product-description">
                {product.description}
            </p>

            <div className="stock-status">
                <strong>Stock :</strong>
                {product.stock > 0 ? (
                    <span className="in-stock">
                        In Stock ({product.stock})
                    </span>
                ) : (
                    <span className="out-stock">
                        Out Of Stock
                    </span>
                )}
            </div>

            <div className="quantity-section">
                <h4>Quantity</h4>
                <QuantitySelector
                    stock={product.stock || 99}
                    onQuantityChange={handleQuantityChange}
                />
            </div>

            <button
                type="button"
                className={`add-cart-btn ${isAdded ? "added" : ""}`}
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
            >
                {isAdded ? (
                    <>
                        <Check size={20} style={{ marginRight: 8 }} />
                        ADDED TO CART
                    </>
                ) : (
                    <>
                        <ShoppingCart size={20} style={{ marginRight: 8 }} />
                        ADD TO CART
                    </>
                )}
            </button>

            <button
                type="button"
                className="buy-now-btn"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
            >
                BUY NOW
            </button>
        </div>
    );
};

export default ProductInfo;