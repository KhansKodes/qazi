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
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getBrands as getBrandsService,
  createBrand as createBrandService,
  updateBrand as updateBrandService,
  deleteBrand as deleteBrandService,
} from "../../api/services/brandsService";

// Get Brands
export const getBrands = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BRANDS });
    const response = await getBrandsService();
    console.log("Get Brands Response:", response); // Debug log

    // Check if response has data property and it's the expected structure
    if (response && response.data && Array.isArray(response.data.brands)) {
      dispatch({
        type: GET_BRANDS_SUCCESS,
        payload: response.data.brands,
      });
    } else {
      console.error("Unexpected response structure:", response);
      dispatch({
        type: GET_BRANDS_FAIL,
        payload: "Invalid response format",
      });
    }
  } catch (error) {
    console.error("Get Brands Error:", error);
    dispatch({
      type: GET_BRANDS_FAIL,
      payload: error.message || "Failed to fetch brands",
    });
  }
};

// Create Brand
export const createBrand = createAsyncThunk(
  "brand/create",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await createBrandService(formData);
      console.log("Create Brand Response:", response);

      if (response.status === "fail" || !response.data) {
        return rejectWithValue(response);
      }

      // After successful creation, fetch updated list
      await dispatch(getBrands());

      return response.data;
    } catch (error) {
      console.error("Create Brand Error:", error);
      return rejectWithValue(
        error.response?.data || {
          message: "An error occurred while creating the brand",
        }
      );
    }
  }
);

export const createBrandSuccess = (brand) => ({
  type: CREATE_BRAND_SUCCESS,
  payload: brand,
});

export const createBrandFail = (error) => ({
  type: CREATE_BRAND_FAIL,
  payload: error,
});

// Update Brand
export const updateBrand = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BRAND });
    const response = await updateBrandService(id, data);

    if (response.status === "fail") {
      dispatch({
        type: UPDATE_BRAND_FAIL,
        payload: response.message || "Failed to update brand",
      });
      return Promise.reject(response);
    }

    dispatch({
      type: UPDATE_BRAND_SUCCESS,
      payload: response.data,
    });

    // Fetch updated list after successful update
    dispatch(getBrands());
    return Promise.resolve(response.data);
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
      payload: error.message || "Failed to update brand",
    });
    return Promise.reject(error);
  }
};

export const updateBrandSuccess = (brand) => ({
  type: UPDATE_BRAND_SUCCESS,
  payload: brand,
});

export const updateBrandFail = (error) => ({
  type: UPDATE_BRAND_FAIL,
  payload: error,
});

// Delete Brand
export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BRAND });
    const response = await deleteBrandService(id);

    if (response.status === "fail") {
      dispatch({
        type: DELETE_BRAND_FAIL,
        payload: response.message || "Failed to delete brand",
      });
      return Promise.reject(response);
    }

    dispatch({
      type: DELETE_BRAND_SUCCESS,
      payload: id,
    });

    // Fetch updated list after successful deletion
    dispatch(getBrands());
    return Promise.resolve(response);
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
      payload: error.message || "Failed to delete brand",
    });
    return Promise.reject(error);
  }
};

export const deleteBrandSuccess = (id) => ({
  type: DELETE_BRAND_SUCCESS,
  payload: id,
});

export const deleteBrandFail = (error) => ({
  type: DELETE_BRAND_FAIL,
  payload: error,
});
