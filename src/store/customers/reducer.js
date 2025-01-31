import {
  GET_CUSTOMERS,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAIL,
  CREATE_CUSTOMER,
  CREATE_CUSTOMER_SUCCESS,
  CREATE_CUSTOMER_FAIL,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
} from "./actionTypes";

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

export const customersReducer = (state = initialState, action) => {
  switch (action.type) {
    // Get Customers
    case GET_CUSTOMERS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload,
        error: null,
      };
    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Create Customer
    case CREATE_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: [...state.customers, action.payload],
        error: null,
      };
    case CREATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Update Customer
    case UPDATE_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.map((customer) =>
          customer.id === action.payload.id ? action.payload : customer
        ),
        error: null,
      };
    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Delete Customer
    case DELETE_CUSTOMER:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter((customer) => customer.id !== action.payload),
        error: null,
      };
    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}; 