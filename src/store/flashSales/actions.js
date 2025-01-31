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

import {
  getFlashSales as getFlashSalesService,
  createFlashSale as createFlashSaleService,
  updateFlashSale as updateFlashSaleService,
  deleteFlashSale as deleteFlashSaleService,
} from "../../api/services/flashSalesService";

// Get Flash Sales
export const getFlashSales = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FLASH_SALES });
    const response = await getFlashSalesService();

    if (response && response.data) {
      dispatch({
        type: GET_FLASH_SALES_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_FLASH_SALES_FAIL,
        payload: "Invalid response format",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_FLASH_SALES_FAIL,
      payload: error.message || "Failed to fetch flash sales",
    });
  }
};

// Create Flash Sale
export const createFlashSale = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_FLASH_SALE });
    const response = await createFlashSaleService(data);

    dispatch({
      type: CREATE_FLASH_SALE_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_FLASH_SALE_FAIL,
      payload: error.message || "Failed to create flash sale",
    });
    throw error;
  }
};

// Update Flash Sale
export const updateFlashSale = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_FLASH_SALE });
    const response = await updateFlashSaleService(id, data);

    dispatch({
      type: UPDATE_FLASH_SALE_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_FLASH_SALE_FAIL,
      payload: error.message || "Failed to update flash sale",
    });
    throw error;
  }
};

// Delete Flash Sale
export const deleteFlashSale = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_FLASH_SALE });
    await deleteFlashSaleService(id);

    dispatch({
      type: DELETE_FLASH_SALE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_FLASH_SALE_FAIL,
      payload: error.message || "Failed to delete flash sale",
    });
    throw error;
  }
}; 