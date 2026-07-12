import QuantitySelector from "./QuantitySelector";
import { Star } from "lucide-react";

const ProductInfo = ({ product, onQuantityChange }) => {

    if (!product) return null;

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
                    ({product.reviewCount} Reviews)
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
                    stock={product.stock}
                    onQuantityChange={onQuantityChange}
                />

            </div>

            <button className="add-cart-btn">
                ADD TO CART
            </button>

            <button className="buy-now-btn">
                BUY NOW
            </button>

        </div>

    );

};

export default ProductInfo;