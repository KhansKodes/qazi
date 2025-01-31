import axios from "../axios";

export const getCustomers = () => {
  return axios.get("/customers");
};

export const createCustomer = (data) => {
  return axios.post("/customers", data);
};

export const updateCustomer = (id, data) => {
  return axios.put(`/customers/${id}`, data);
};

export const deleteCustomer = (id) => {
  return axios.delete(`/customers/${id}`);
}; 