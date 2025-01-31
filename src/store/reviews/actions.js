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

import {
  getReviews as getReviewsService,
  createReview as createReviewService,
  updateReview as updateReviewService,
  deleteReview as deleteReviewService,
} from "../../api/services/reviewsService";

// Get Reviews
export const getReviews = () => async (dispatch) => {
  try {
    dispatch({ type: GET_REVIEWS });
    const response = await getReviewsService();

    if (response && response.data) {
      dispatch({
        type: GET_REVIEWS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_REVIEWS_FAIL,
        payload: "Invalid response format",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_REVIEWS_FAIL,
      payload: error.message || "Failed to fetch reviews",
    });
  }
};

// Create Review
export const createReview = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_REVIEW });
    const response = await createReviewService(data);

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAIL,
      payload: error.message || "Failed to create review",
    });
    throw error;
  }
};

// Update Review
export const updateReview = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_REVIEW });
    const response = await updateReviewService(id, data);

    dispatch({
      type: UPDATE_REVIEW_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_REVIEW_FAIL,
      payload: error.message || "Failed to update review",
    });
    throw error;
  }
};

// Delete Review
export const deleteReview = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW });
    await deleteReviewService(id);

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.message || "Failed to delete review",
    });
    throw error;
  }
}; 