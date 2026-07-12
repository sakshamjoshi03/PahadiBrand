import { useState, useEffect } from "react";

const QuantitySelector = ({ stock = 1, onQuantityChange }) => {

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        if (onQuantityChange) {
            onQuantityChange(quantity);
        }

    }, [quantity, onQuantityChange]);

    const increaseQuantity = () => {

        if (quantity < stock) {
            setQuantity(quantity + 1);
        }

    };

    const decreaseQuantity = () => {

        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    };

    return (

        <div className="quantity-selector">

            <button
                onClick={decreaseQuantity}
                className="quantity-btn"
            >
                −
            </button>

            <span className="quantity-value">
                {quantity}
            </span>

            <button
                onClick={increaseQuantity}
                className="quantity-btn"
            >
                +
            </button>

        </div>

    );

};

export default QuantitySelector;