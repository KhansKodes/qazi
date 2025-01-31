import axios from "axios";
import { authHeader } from "../helpers/authHelper";
import { getErrorMessage } from "./apiErrorHandler";

// create base url for axios
const BASE_URL = "https://ihouse-6zv6.onrender.com/api";
const VERSION = "/v1";

const axiosApi = axios.create({
  baseURL: `${BASE_URL}${VERSION}`,
});

axiosApi.interceptors.request.use(
  (config) => {
    const headers = authHeader();
    if (headers.Authorization && headers.Authorization.trim() !== "") {
      config.headers.Authorization = headers.Authorization;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const handleApiError = (error, requestType, operation) => {
  // If error is already a string, wrap it in our error response format
  if (typeof error === "string") {
    return {
      status: "fail",
      message: error,
    };
  }

  const errorMessage = getErrorMessage(error, requestType, operation);
  return {
    status: "fail",
    message: errorMessage,
  };
};

// Helper function to create headers and make API calls
const makeApiCall = async (method, url, data = null, config = {}) => {
  try {
    const headers =
      method === "delete"
        ? {}
        : {
            ...(data instanceof FormData
              ? { "Content-Type": "multipart/form-data" }
              : { "Content-Type": "application/json" }),
          };

    const response = await axiosApi({
      method,
      url,
      data,
      ...config,
      headers: {
        ...headers,
        ...config.headers,
      },
    });
    return response.data;
  } catch (error) {
    return handleApiError(error, config.requestType, method);
  }
};

export async function get(url, config = {}) {
  return makeApiCall("get", url, null, config);
}

export async function post(url, data, config = {}) {
  return makeApiCall("post", url, data, config);
}

export async function put(url, data, config = {}) {
  return makeApiCall("put", url, data, config);
}

export async function patch(url, data, config = {}) {
  return makeApiCall("patch", url, data, config);
}

export async function del(url, config = {}) {
  return makeApiCall("delete", url, null, config);
}
