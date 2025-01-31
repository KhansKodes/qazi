import axios from "../axios";

export const getFlashSales = () => {
  return axios.get("/flash-sales");
};

export const createFlashSale = (data) => {
  return axios.post("/flash-sales", data);
};

export const updateFlashSale = (id, data) => {
  return axios.put(`/flash-sales/${id}`, data);
};

export const deleteFlashSale = (id) => {
  return axios.delete(`/flash-sales/${id}`);
}; 