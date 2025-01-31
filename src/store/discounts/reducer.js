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

const initialState = {
  discounts: [],
  loading: false,
  error: null,
};

export const discountsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Discounts
    case GET_DISCOUNTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_DISCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: action.payload,
        error: null,
      };
    case GET_DISCOUNTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Discount
    case CREATE_DISCOUNT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: [...state.discounts, action.payload],
        error: null,
      };
    case CREATE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Discount
    case UPDATE_DISCOUNT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: state.discounts.map((discount) =>
          discount.id === action.payload.id ? action.payload : discount
        ),
        error: null,
      };
    case UPDATE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Discount
    case DELETE_DISCOUNT:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        discounts: state.discounts.filter((discount) => discount.id !== action.payload),
        error: null,
      };
    case DELETE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}; 