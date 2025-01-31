import {
  GET_REVIEWS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  CREATE_REVIEW,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAIL,
  UPDATE_REVIEW,
  UPDATE_REVIEW_SUCCESS,
  UPDATE_REVIEW_FAIL,
  DELETE_REVIEW,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "./actionTypes";

const initialState = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Reviews
    case GET_REVIEWS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_REVIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: action.payload,
        error: null,
      };
    case GET_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Review
    case CREATE_REVIEW:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: [...state.reviews, action.payload],
        error: null,
      };
    case CREATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Review
    case UPDATE_REVIEW:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.map((review) =>
          review.id === action.payload.id ? action.payload : review
        ),
        error: null,
      };
    case UPDATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Review
    case DELETE_REVIEW:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: state.reviews.filter((review) => review.id !== action.payload),
        error: null,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}; 