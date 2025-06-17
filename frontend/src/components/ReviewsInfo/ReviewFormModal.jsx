import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";
import { useModal } from "../../context/Modal";
import { FaStar } from "react-icons/fa";
import "./ReviewFormModal.css";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);
  const spotReviews = Object.values(useSelector((state) => state.reviews));

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const reviewExists = spotReviews.some(
    (rev) => rev.userId === sessionUser?.id
  );

  const starsArr = [1, 2, 3, 4, 5];

  useEffect(() => {
    const newErrors = {};

    if (review.length < 10)
      newErrors.review = "Must be at least 10 characters";
    if (!stars) newErrors.stars = "Must select star rating";
    if (reviewExists) newErrors.review = "Review already exists for this spot";

    setErrors(newErrors);
  }, [review, stars, reviewExists]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setServerError("");

    if (Object.keys(errors).length > 0) return;

    const payload = { review, stars };

    try {
      await dispatch(reviewActions.createReviewsThunk(spotId, payload));
      await dispatch(spotActions.readSpotThunk(spotId));
      closeModal();
    } catch {
      setServerError(
        "An error occurred while submitting your review. Please try again."
      );
    }
  };

  const isDisabled = Object.keys(errors).length > 0;

  return (
    <div className="review-modal modal-box">
      <h1>How was your stay?</h1>
      {serverError && <p className="server-error">{serverError}</p>}
      <form onSubmit={handleSubmit} className="review-form">
        <div className="review-text-container">
          <textarea
            className="text-area"
            name="review"
            value={review}
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
            required
          />
          {hasSubmitted && errors.review && <p>{errors.review}</p>}
        </div>

        <div className="star-container">
          {starsArr.map((currStar) => (
            <label key={currStar}>
              <input
                type="radio"
                name="rating"
                value={currStar}
                onChange={() => setStars(currStar)}
                required
              />
              <span
                className="star"
                style={{
                  color: currStar <= (hover || stars) ? "#027373" : "#A9D9D0",
                }}
                onMouseEnter={() => setHover(currStar)}
                onMouseLeave={() => setHover(null)}
              >
                <FaStar />
              </span>
            </label>
          ))}
          <span>Stars</span>
        </div>

        {hasSubmitted && errors.stars && <p>{errors.stars}</p>}

        <button
          type="submit"
          disabled={isDisabled}
          className="review-submit-button"
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;