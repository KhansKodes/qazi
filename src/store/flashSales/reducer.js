import {
  GET_FLASH_SALES,
  GET_FLASH_SALES_SUCCESS,
  GET_FLASH_SALES_FAIL,
  CREATE_FLASH_SALE,
  CREATE_FLASH_SALE_SUCCESS,
  CREATE_FLASH_SALE_FAIL,
  UPDATE_FLASH_SALE,
  UPDATE_FLASH_SALE_SUCCESS,
  UPDATE_FLASH_SALE_FAIL,
  DELETE_FLASH_SALE,
  DELETE_FLASH_SALE_SUCCESS,
  DELETE_FLASH_SALE_FAIL,
} from "./actionTypes";

const initialState = {
  flashSales: [],
  loading: false,
  error: null,
};

export const flashSalesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Flash Sales
    case GET_FLASH_SALES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_FLASH_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        flashSales: action.payload,
        error: null,
      };
    case GET_FLASH_SALES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Flash Sale
    case CREATE_FLASH_SALE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_FLASH_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        flashSales: [...state.flashSales, action.payload],
        error: null,
      };
    case CREATE_FLASH_SALE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Flash Sale
    case UPDATE_FLASH_SALE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_FLASH_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        flashSales: state.flashSales.map((sale) =>
          sale.id === action.payload.id ? action.payload : sale
        ),
        error: null,
      };
    case UPDATE_FLASH_SALE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Flash Sale
    case DELETE_FLASH_SALE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_FLASH_SALE_SUCCESS:
      return {
        ...state,
        loading: false,
        flashSales: state.flashSales.filter((sale) => sale.id !== action.payload),
        error: null,
      };
    case DELETE_FLASH_SALE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}; 