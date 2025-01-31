import axios from "../axios";

export const getReviews = () => {
  return axios.get("/reviews");
};

export const createReview = (data) => {
  return axios.post("/reviews", data);
};

export const updateReview = (id, data) => {
  return axios.put(`/reviews/${id}`, data);
};

export const deleteReview = (id) => {
  return axios.delete(`/reviews/${id}`);
}; 