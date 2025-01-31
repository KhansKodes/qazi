import {
  GET_BRANDS,
  GET_BRANDS_SUCCESS,
  GET_BRANDS_FAIL,
  CREATE_BRAND,
  CREATE_BRAND_SUCCESS,
  CREATE_BRAND_FAIL,
  UPDATE_BRAND,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  DELETE_BRAND,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
} from "./actionTypes";

const initialState = {
  brands: [],
  loading: false,
  error: null,
};

export const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Brands
    case GET_BRANDS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_BRANDS_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.payload || [],
        error: null,
      };
    case GET_BRANDS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Brand
    case "brand/create/pending":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "brand/create/fulfilled":
      return {
        ...state,
        loading: false,
        brands: Array.isArray(state.brands)
          ? [...state.brands, action.payload]
          : [action.payload],
        error: null,
      };
    case "brand/create/rejected":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Brand
    case UPDATE_BRAND:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: Array.isArray(state.brands)
          ? state.brands.map((brand) =>
              brand._id === action.payload._id ? action.payload : brand
            )
          : [action.payload],
      };
    case UPDATE_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Brand
    case DELETE_BRAND:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BRAND_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: Array.isArray(state.brands)
          ? state.brands.filter((brand) => brand._id !== action.payload)
          : [],
      };
    case DELETE_BRAND_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
