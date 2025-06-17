import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import ReviewFormModal from "./ReviewFormModal";
import OpenModalButton from "../OpenModalButton";
import ReviewDetails from "./ReviewDetails";

const ReviewInfo = ({ spotDetails, currUser, spotId }) => {
  const { ownerId, avgStarRating, numReviews } = spotDetails;

  const [noReviews, setNoReviews] = useState(false);

  const reviews = Object.values(useSelector((state) => state.reviews));

  const sortedSpotReviews = reviews.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const userHasReviewed = reviews.some(
    (review) => review.userId === currUser?.id
  );

  useEffect(() => {
    setNoReviews(sortedSpotReviews.length === 0);
  }, [sortedSpotReviews]);

  const canPostReview =
    currUser && currUser.id !== ownerId && !userHasReviewed;

  return (
    <div>
      <h3 className="spot-rating">
        <FaStar />
        {avgStarRating ? avgStarRating.toFixed(1) : "New"}{" "}
        {numReviews ? `・${numReviews} ${numReviews > 1 ? "reviews" : "review"}` : ""}
      </h3>

      <div className="reviews-header">
        {canPostReview && (
          <div>
            <OpenModalButton
              buttonText="Post Your Review"
              itemText="Post your review"
              modalComponent={<ReviewFormModal spotId={spotId} />}
            />
            {noReviews && <p>Be the first to post a review!</p>}
          </div>
        )}

        <div className="reviews">
          {sortedSpotReviews.map((review, index) => (
            <ReviewDetails
              key={review.id}
              currUser={currUser}
              review={review}
              spotId={spotId}
              className={index % 2 === 0 ? "review-even" : "review-odd"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewInfo;