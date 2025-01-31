// Default error messages for different request types
const DEFAULT_ERROR_MESSAGES = {
  auth: {
    login: "Invalid credentials",
    register: "Registration failed",
    forgotPassword: "Password reset request failed",
  },
  brands: {
    get: "Failed to fetch brands",
    create: "Failed to create brand",
    update: "Failed to update brand",
    delete: "Failed to delete brand",
  },
  generic: {
    get: "Failed to fetch data",
    post: "Failed to submit data",
    put: "Failed to update data",
    patch: "Failed to update data",
    delete: "Failed to delete data",
  },
};

// Extract error message from API response
export const getErrorMessage = (
  error,
  requestType = "generic",
  operation = "post"
) => {
  // If there's an API response with error message, use that
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // If there's a specific error message for this request type
  if (DEFAULT_ERROR_MESSAGES[requestType]?.[operation]) {
    return DEFAULT_ERROR_MESSAGES[requestType][operation];
  }

  // Fallback to generic error messages based on HTTP status
  if (error.response?.status) {
    switch (error.response.status) {
      case 400:
        return "Invalid request";
      case 401:
        return "Unauthorized access";
      case 403:
        return "Access forbidden";
      case 404:
        return "Resource not found";
      case 500:
        return "Internal server error";
      default:
        return DEFAULT_ERROR_MESSAGES.generic[operation];
    }
  }

  // Final fallback
  return "An unexpected error occurred";
};
