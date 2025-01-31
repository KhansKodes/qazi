export const setAuthToken = (token) => {
  localStorage.setItem("authToken", JSON.stringify(token));
};

export const setAuthUser = (user) => {
  localStorage.setItem("authUser", JSON.stringify(user));
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

export const removeAuthUser = () => {
  localStorage.removeItem("authUser");
};

export const getAuthToken = () => {
  return JSON.parse(localStorage.getItem("authToken"));
};

export const getAuthUser = () => {
  return JSON.parse(localStorage.getItem("authUser"));
};

export const authHeader = () => {
  const accessToken = getAuthToken();

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return {};
  }
};
