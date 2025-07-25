import { csrfFetch } from './csrf';

const CREATE_REVIEWS = "reviews/createReviews"
const READ_REVIEWS = "reviews/readReviews"
const DELETE_REVIEWS = "reviews/deleteReviews"

const createReviews = (payload) => ({
    type: CREATE_REVIEWS,
    payload
})
const readReviews = (payload) => ({
    type: READ_REVIEWS,
    payload
})
const deleteReviews = (payload) => ({
    type: DELETE_REVIEWS,
    payload
})


export const createReviewsThunk = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })

    if(response.ok){
        const data = await response.json();
        dispatch(createReviews(data))
        return data
    }
}

export const readReviewsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'GET'
    })

    if(response.ok){
        const data = await response.json();
        dispatch(readReviews(data.Reviews))
        
        return data
    }
}

export const deleteReviewsThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
    })

    if(response.ok){
        dispatch(deleteReviews(reviewId))
    }
}

const initialState = {}

const reviewsReducer = (state= initialState, action) => {
    let newState;
    switch(action.type) {
        case CREATE_REVIEWS:
            newState = { ...state };
            newState[action.payload.id] = {...action.payload};
            return newState;
        case READ_REVIEWS:
            newState = {};
            action.payload.forEach(
              (review) => (newState[review.id] = review)
            );
            return newState;
        case DELETE_REVIEWS:
            newState = { ...state };
            delete newState[action.payload]
            return newState;
        default:
            return state;
    }
}

export default reviewsReducer