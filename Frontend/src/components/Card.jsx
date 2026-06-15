import "./Card.css";

function Card({ image, title, description, price, tag }) {
  return (
    <div className="card">

      <div className="card-image">
        <img src={image} alt={title} />

        {tag && (
          <span className="product-tag">
            {tag}
          </span>
        )}
      </div>

      <div className="card-content">

        <h3>{title}</h3>

        <p>{description}</p>

        <h4>{price}</h4>

        <button>
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default Card;