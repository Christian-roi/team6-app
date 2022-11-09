import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getComment = createAsyncThunk(
  "GET_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `https://endpoint-for-booklist.herokuapp.com/comments/${arg}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  data: {
    content: "",
    username: "",
    id: 0,
    bookId: "",
  },
  isLoading: false,
  error: null,
  isGlobalEditmode: false,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    clearComment: (state) => {
      state.data.content = "";
    },
    globalEditModeToggle: (state, action) => {
      state.isGlobalEditmode = action.payload;
    },
  },
  extraReducers: {
    [__getComment.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { clearComment, globalEditModeToggle } = commentSlice.actions;
export default commentSlice.reducer;
