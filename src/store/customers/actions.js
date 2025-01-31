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

import {
  getCustomers as getCustomersService,
  createCustomer as createCustomerService,
  updateCustomer as updateCustomerService,
  deleteCustomer as deleteCustomerService,
} from "../../api/services/customersService";

// Get Customers
export const getCustomers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CUSTOMERS });
    const response = await getCustomersService();

    if (response && response.data) {
      dispatch({
        type: GET_CUSTOMERS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_CUSTOMERS_FAIL,
        payload: "Invalid response format",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CUSTOMERS_FAIL,
      payload: error.message || "Failed to fetch customers",
    });
  }
};

// Create Customer
export const createCustomer = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CUSTOMER });
    const response = await createCustomerService(data);

    dispatch({
      type: CREATE_CUSTOMER_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_CUSTOMER_FAIL,
      payload: error.message || "Failed to create customer",
    });
    throw error;
  }
};

// Update Customer
export const updateCustomer = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER });
    const response = await updateCustomerService(id, data);

    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: error.message || "Failed to update customer",
    });
    throw error;
  }
};

// Delete Customer
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CUSTOMER });
    await deleteCustomerService(id);

    dispatch({
      type: DELETE_CUSTOMER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOMER_FAIL,
      payload: error.message || "Failed to delete customer",
    });
    throw error;
  }
}; 