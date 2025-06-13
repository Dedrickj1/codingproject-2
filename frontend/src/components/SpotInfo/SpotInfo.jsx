import { FaStar } from "react-icons/fa";
import "./SpotInfo.css";

function SpotInfo({ spotDetails }) {
  const {
    Owner: host,
    SpotImages: images,
    avgStarRating: rating,
    city,
    state,
    country,
    description,
    name,
    numReviews: reviewCount,
    price,
  } = spotDetails;

  const showComingSoonAlert = () => {
    alert("Feature Coming Soon...");
  };

  // Sort images so preview images come first
  const sortedImages = [...images].sort((imgA, imgB) => imgB.preview - imgA.preview);

  return (
    <section className="page">
      <h2 className="spot-title">{name}</h2>
      <p className="spot-location">
        {city}, {state}, {country}
      </p>

      <div className="spot-images">
        {sortedImages.map((img, idx) => (
          <img
            key={img.id}
            src={img.url}
            alt={`${name} image ${idx + 1}`}
            className={idx === 0 ? "large-image" : "small-image"}
          />
        ))}
      </div>

      <div className="details-callout-wrapper">
        <div className="details-container">
          <h2 className="spot-host">
            Hosted by {host.firstName} {host.lastName}
          </h2>
          <p className="spot-description">{description}</p>
        </div>

        <aside className="callout-container">
          <div className="callout-text">
            <span className="callout-price">${price} night</span>
            <p className="callout-rating">
              <FaStar />
              {rating ? rating.toFixed(1) : "New"}{" "}
              {reviewCount ? `・${reviewCount}` : ""}{" "}
              {reviewCount === 1 ? "review" : reviewCount > 1 ? "reviews" : ""}
            </p>
          </div>

          <div className="button-container">
            <button className="button" onClick={showComingSoonAlert}>
              Reserve
            </button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default SpotInfo;