import { get, post, put, del } from "../apiHelper";
import { ADMIN_BRANDS } from "../apiUrls";

export const getBrands = async () => {
  try {
    const response = await get(ADMIN_BRANDS, {
      requestType: "brands",
      operation: "get",
    });
    console.log("getBrands service response:", response); // Debug log
    return response;
  } catch (error) {
    console.error("getBrands service error:", error); // Debug log
    throw error;
  }
};

export const createBrand = (data) =>
  post(ADMIN_BRANDS, data, {
    requestType: "brands",
    operation: "create",
  });

export const updateBrand = (id, data) =>
  put(`${ADMIN_BRANDS}/${id}`, data, {
    requestType: "brands",
    operation: "update",
  });

export const deleteBrand = (id) =>
  del(`${ADMIN_BRANDS}/${id}`, {
    requestType: "brands",
    operation: "delete",
  });
