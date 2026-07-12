import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const RelatedProducts = ({ products = [] }) => {

    const navigate = useNavigate();

    if (!products.length) return null;

    return (

        <section className="related-products-section">

            <h2 className="section-title">
                Related Products
            </h2>

            <div className="related-products-grid">

                {products.map((product) => {

                    const primaryImage =
                        product.images?.find(img => img.isPrimary) ||
                        product.images?.[0];

                    return (

                        <div
                            key={product._id}
                            className="related-product-card"
                            onClick={() => navigate(`/products/${product._id}`)}
                        >

                            <img
                                src={primaryImage?.url}
                                alt={product.name}
                                className="related-product-image"
                            />

                            <div className="related-product-content">

                                <span className="related-category">
                                    {product.category}
                                </span>

                                <h3>
                                    {product.name}
                                </h3>

                                <div className="related-rating">

                                    <Star
                                        size={15}
                                        fill="#F4B400"
                                        color="#F4B400"
                                    />

                                    <span>{product.rating}</span>

                                </div>

                                <h4>
                                    ₹{product.price}
                                </h4>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

};

export default RelatedProducts;