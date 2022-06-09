import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./todosSlice";
const store = configureStore({
  reducer: reducer,
});

export default store;
