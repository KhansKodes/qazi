import {
  GET_DISCOUNTS,
  GET_DISCOUNTS_SUCCESS,
  GET_DISCOUNTS_FAIL,
  CREATE_DISCOUNT,
  CREATE_DISCOUNT_SUCCESS,
  CREATE_DISCOUNT_FAIL,
  UPDATE_DISCOUNT,
  UPDATE_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_FAIL,
  DELETE_DISCOUNT,
  DELETE_DISCOUNT_SUCCESS,
  DELETE_DISCOUNT_FAIL,
} from "./actionTypes";

import {
  getDiscounts as getDiscountsService,
  createDiscount as createDiscountService,
  updateDiscount as updateDiscountService,
  deleteDiscount as deleteDiscountService,
} from "../../api/services/discountsService";

// Get Discounts
export const getDiscounts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_DISCOUNTS });
    const response = await getDiscountsService();

    if (response && response.data) {
      dispatch({
        type: GET_DISCOUNTS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_DISCOUNTS_FAIL,
        payload: "Invalid response format",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_DISCOUNTS_FAIL,
      payload: error.message || "Failed to fetch discounts",
    });
  }
};

// Create Discount
export const createDiscount = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DISCOUNT });
    const response = await createDiscountService(data);

    dispatch({
      type: CREATE_DISCOUNT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_DISCOUNT_FAIL,
      payload: error.message || "Failed to create discount",
    });
    throw error;
  }
};

// Update Discount
export const updateDiscount = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DISCOUNT });
    const response = await updateDiscountService(id, data);

    dispatch({
      type: UPDATE_DISCOUNT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_DISCOUNT_FAIL,
      payload: error.message || "Failed to update discount",
    });
    throw error;
  }
};

// Delete Discount
export const deleteDiscount = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DISCOUNT });
    await deleteDiscountService(id);

    dispatch({
      type: DELETE_DISCOUNT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DISCOUNT_FAIL,
      payload: error.message || "Failed to delete discount",
    });
    throw error;
  }
}; 