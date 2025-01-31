import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  CREATE_PRODUCT,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  DELETE_PRODUCT,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
} from "./actionTypes";

import {
  getProducts as getProductsService,
  createProduct as createProductService,
  updateProduct as updateProductService,
  deleteProduct as deleteProductService,
} from "../../api/services/productsService";

// Get Products
export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS });
    const response = await getProductsService();

    if (response && response.data) {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: response.data,
      });
    } else {
      dispatch({
        type: GET_PRODUCTS_FAIL,
        payload: "Invalid response format",
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.message || "Failed to fetch products",
    });
  }
};

// Create Product
export const createProduct = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT });
    const response = await createProductService(data);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.message || "Failed to create product",
    });
    throw error;
  }
};

// Update Product
export const updateProduct = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT });
    const response = await updateProductService(id, data);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: response.data,
    });
    return response.data;
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.message || "Failed to update product",
    });
    throw error;
  }
};

// Delete Product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT });
    await deleteProductService(id);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error.message || "Failed to delete product",
    });
    throw error;
  }
}; 