import { memo, useState } from "react";
import { useCart } from "../context/CartContext";
import { Check, ShoppingCart } from "lucide-react";
import "./Card.css";

function Card({ product, image, title, description, price, tag, onAddToCart }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(e);
    } else {
      const itemToAdd = product || {
        name: title,
        title,
        price,
        image,
        tag,
        description,
      };
      addToCart(itemToAdd, 1);
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title || "Product"} loading="lazy" />

        {tag && (
          <span className="product-tag">
            {tag}
          </span>
        )}
      </div>

      <div className="card-content">
        <h3 title={title}>{title}</h3>

        <p title={description}>{description}</p>

        <h4>{price}</h4>

        <button
          type="button"
          className={`card-cart-btn ${isAdded ? "added" : ""}`}
          onClick={handleAddToCart}
          aria-label={`Add ${title} to cart`}
        >
          {isAdded ? (
            <>
              <Check size={18} className="cart-btn-icon" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingCart size={18} className="cart-btn-icon" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default memo(Card);