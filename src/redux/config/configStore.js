import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../modules/bookSlices";
import commentReducer from "../modules/commentSlices";
import commentsReducer from "../modules/commentsSlices";
import userReducer from "../modules/userSlices";
// import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    books: bookReducer,
    comments: commentsReducer,
    comment: commentReducer,
    user: userReducer,
  },
});

export default store;
