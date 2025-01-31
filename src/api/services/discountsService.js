import axios from "../axios";

export const getDiscounts = () => {
  return axios.get("/discounts");
};

export const createDiscount = (data) => {
  return axios.post("/discounts", data);
};

export const updateDiscount = (id, data) => {
  return axios.put(`/discounts/${id}`, data);
};

export const deleteDiscount = (id) => {
  return axios.delete(`/discounts/${id}`);
}; 