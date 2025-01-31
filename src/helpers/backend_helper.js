import axios from "axios";

// Apply base url for axios
const API_URL = process.env.REACT_APP_API_URL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("authUser")
    ? JSON.parse(localStorage.getItem("authUser")).token
    : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Reports API
export const getReportsApi = (dateRange) => {
  // For now, return mock data
  return Promise.resolve({
    revenue: {
      total: 127151.00,
      increase: 28731,
    },
    products: {
      total: 57,
      increase: 123,
    },
    customers: {
      total: 10,
      increase: 10,
      chartData: [
        { date: "08 Jan", value: 10 }
      ],
    },
    orders: {
      total: 26,
      increase: 10,
      chartData: [
        { date: "02 Jan", value: 4 },
        { date: "03 Jan", value: 7 },
        { date: "04 Jan", value: 8 },
        { date: "05 Jan", value: 6 },
        { date: "06 Jan", value: 5 },
        { date: "07 Jan", value: 7 },
        { date: "08 Jan", value: 2 },
        { date: "31 Jan", value: 1 }
      ],
    },
  });
  // When API is ready, use this:
  // return axiosApi.get("/reports", { params: dateRange });
}; 