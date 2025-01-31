import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          "brand/create",
          "brand/create/fulfilled",
          "brand/create/rejected",
        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.formData", "meta.arg"],
      },
    }).concat(thunk),
});

export default store;
