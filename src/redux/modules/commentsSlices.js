import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getCommentsThunk = createAsyncThunk(
  "GET_COMMENTS",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `https://endpoint-for-booklist.herokuapp.com/comments`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getCommnetsByBookId = createAsyncThunk(
  "GET_COMMENT_BY_Book_ID",
  async (arg, thunkAPI) => {
    try {
      const data = await axios.get(
        `https://endpoint-for-booklist.herokuapp.com/comments?BookId=${arg}`
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(
        `https://endpoint-for-booklist.herokuapp.com/comments/${arg}`
      );
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(
        `https://endpoint-for-booklist.herokuapp.com/comments/${arg.id}`,
        arg
      );
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `https://endpoint-for-booklist.herokuapp.com/comments`,
        arg
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);



const initialState = {
  comments: {
    data: [],
    isLoading: false,
    error: null,
  },
  commentsByBookId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearBook: (state) => {
      state.comments = null;
    },
  },
  extraReducers: {

    [__getCommentsThunk.pending]: (state) => {
      state.comments.isLoading = true;
    },
    [__getCommentsThunk.fulfilled]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.data = action.payload;
    },
    [__getCommentsThunk.rejected]: (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    },


    [__getCommnetsByBookId.pending]: (state) => {
      state.commentsByBookId.isLoading = true;
    },
    [__getCommnetsByBookId.fulfilled]: (state, action) => {
      state.commentsByBookId.isLoading = false;
      state.commentsByBookId.data = action.payload;
    },
    [__getCommnetsByBookId.rejected]: (state, action) => {
      state.commentsByBookId.isLoading = false;
      state.commentsByBookId.error = action.payload;
    },

    [__deleteComment.pending]: (state) => {
      state.commentsByBookId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByBookId.isLoading = false;
      const target = state.commentsByBookId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByBookId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByBookId.isLoading = false;
      state.commentsByBookId.error = action.payload;
    },
    [__updateComment.pending]: (state) => {},
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByBookId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.commentsByBookId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: () => {},

    [__addComment.fulfilled]: (state, action) => {
      state.commentsByBookId.isLoading = false;
      state.commentsByBookId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByBookId.isLoading = false;
      state.commentsByBookId.error = action.payload;
    },
    [__addComment.pending]: (state) => {
      state.commentsByBookId.isLoading = true;
    },
  },
});

export default commentsSlice.reducer;
