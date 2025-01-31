import { post } from "../apiHelper";
import * as url from "../apiUrls";
import {
  getAuthUser,
  removeAuthToken,
  removeAuthUser,
} from "../../helpers/authHelper";

const AUTH_REQUEST_TYPE = "auth";
const AUTH_OPERATION_LOGIN = "login";

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  return getAuthUser();
};

// Check if user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Admin Login Method
const adminLogin = (credentials) =>
  post(url.ADMIN_LOGIN, credentials, {
    requestType: AUTH_REQUEST_TYPE,
    operation: AUTH_OPERATION_LOGIN,
  });

// Logout Method
const logout = () => {
  removeAuthToken();
  removeAuthUser();
};

export { adminLogin, logout, isUserAuthenticated, getLoggedInUser };
