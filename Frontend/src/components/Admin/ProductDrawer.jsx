import { X, Star } from "lucide-react";
import "./ProductDrawer.css";

export default function ProductDrawer({

    product,

    open,

    onClose,

}) {

    if (!open || !product) return null;

    const image =
        product.images?.find((img) => img.isPrimary)?.url ||
        product.images?.[0]?.url ||
        "/product-images/buransh/main.png";

    return (

        <>

            <div

                className="drawer-overlay"

                onClick={onClose}

            />

            <div className="product-drawer">

                <div className="drawer-header">

                    <h2>

                        Product Details

                    </h2>

                    <button
                        type="button"
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close product details"
                    >

                        <X size={22} />

                    </button>

                </div>

                <div className="drawer-content">

                    <img
                        src={image}
                        alt={`${product.name} product preview`}

                        className="drawer-image"

                    />

                    <h2>

                        {product.name}

                    </h2>

                    <div className="drawer-rating">

                        <Star

                            size={18}

                            fill="#FFC107"

                            color="#FFC107"

                        />

                        <span>

                            {product.rating || 0}

                        </span>

                    </div>

                    <div className="drawer-grid">

                        <div>

                            <strong>

                                Category

                            </strong>

                            <p>

                                {product.category}

                            </p>

                        </div>

                        <div>

                            <strong>

                                Price

                            </strong>

                            <p>

                                ₹{product.price}

                            </p>

                        </div>

                        <div>

                            <strong>

                                Stock

                            </strong>

                            <p>

                                {product.stock}

                            </p>

                        </div>

                        <div>

                            <strong>

                                Status

                            </strong>

                            <p>

                                {product.stock > 0

                                    ? "Available"

                                    : "Out of Stock"}

                            </p>

                        </div>

                    </div>

                    <div className="drawer-section">

                        <h3>

                            Description

                        </h3>

                        <p>

                            {product.description ||

                                "No description available."}

                        </p>

                    </div>

                    <div className="drawer-section">

                        <h3>

                            Origin

                        </h3>

                        <p>

                            {product.origin ||

                                "Not Available"}

                        </p>

                    </div>

                    <div className="drawer-section">

                        <h3>

                            Harvest Season

                        </h3>

                        <p>

                            {product.harvestSeason ||

                                "Not Available"}

                        </p>

                    </div>

                    <div className="drawer-section">

                        <h3>

                            Features

                        </h3>

                        <ul>

                            {product.features?.length ? (

                                product.features.map((feature, index) => (

                                    <li key={index}>

                                        {feature}

                                    </li>

                                ))

                            ) : (

                                <li>

                                    No Features Added

                                </li>

                            )}

                        </ul>

                    </div>

                    <div className="drawer-section">

                        <h3>

                            Specifications

                        </h3>

                        <ul>

                            {product.specifications?.length ? (

                                product.specifications.map((spec, index) => (

                                    <li key={index}>

                                        {spec}

                                    </li>

                                ))

                            ) : (

                                <li>

                                    No Specifications

                                </li>

                            )}

                        </ul>

                    </div>

                    <div className="drawer-section">

                        <h3>

                            Sustainability

                        </h3>

                        <p>

                            {product.sustainability ||

                                "Not Available"}

                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}