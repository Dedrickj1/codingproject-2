import DeleteReviewModal from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import "./ReviewDetails.css";

const ReviewDetails = ({ review, currUser, spotId, className }) => {
  if (!review) return null;

  const date = new Date(review.createdAt);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(date);

  const canDelete = currUser?.id === review.userId;

  return (
    <div className={`review-container ${className}`}>
      <h4 className="review-user">{review.User?.firstName || currUser.firstName}</h4>
      <p className="review-date">{formattedDate}</p>
      <p className="review">{review.review}</p>

      {canDelete && (
        <OpenModalButton
          buttonClassName="delete-review-modal-button"
          reviewId={review.id}
          buttonText="Delete"
          modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
        />
      )}
    </div>
  );
};

export default ReviewDetails;