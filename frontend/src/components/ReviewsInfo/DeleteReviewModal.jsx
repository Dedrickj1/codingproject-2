import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import * as reviewActions from "../../store/reviews";
import * as spotActions from "../../store/spots";

const DeleteReviewModal = ({ reviewId, spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const currentSpotId = useSelector((state) => state.spots.id);

  const handleDeleteReview = async (e) => {
    e.preventDefault();

    await dispatch(reviewActions.deleteReviewsThunk(reviewId, currentSpotId));
    await dispatch(spotActions.readSpotThunk(spotId));
    closeModal();
  };

  return (
    <div className="review-modal-container">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to delete this review?</p>
      <br />
      <br />
      <button
        onClick={handleDeleteReview}
        className="delete-review-button butt-wide"
        style={{ backgroundColor: "#E62539" }}
      >
        Yes (Delete Review)
      </button>
      <button
        onClick={closeModal}
        className="keep-review-button butt-wide"
        style={{ backgroundColor: "#333333" }}
      >
        No (Keep Review)
      </button>
    </div>
  );
};

export default DeleteReviewModal;