import { useState, useEffect } from "react";

const ProductGallery = ({ images = [] }) => {

    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {

        if (images.length > 0) {

            const primaryImage =
                images.find((img) => img.isPrimary) ||
                images[0];

            setSelectedImage(primaryImage);

        }

    }, [images]);

    if (!images.length) {
        return <p>No images available.</p>;
    }

    return (

        <div className="product-gallery">

            <div className="main-image-container">

                <img
                    src={selectedImage?.url}
                    alt={selectedImage?.alt}
                    className="main-product-image"
                />

            </div>

            <div className="thumbnail-container">

                {images.map((image) => (

                    <img
                        key={image.url}
                        src={image.url}
                        alt={image.alt}
                        className={`thumbnail-image ${
                            selectedImage?.url === image.url
                                ? "active-thumbnail"
                                : ""
                        }`}
                        onClick={() => setSelectedImage(image)}
                    />

                ))}

            </div>

        </div>

    );
};

export default ProductGallery;