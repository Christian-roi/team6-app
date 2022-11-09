import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    books: [],
};

export const __getBooks = createAsyncThunk(
    "GET_BOOKS",
    async (payload, thunkAPI) => {
        try{
            const data  = await axios.get('https://endpoint-for-booklist.herokuapp.com/book');
            return thunkAPI.fulfillWithValue(data.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __addBook = createAsyncThunk(
    "ADD_BOOK",
    async (payload, thunkAPI) => {
        try{
            const data  = await axios.post('https://endpoint-for-booklist.herokuapp.com/book', payload);
            return thunkAPI.fulfillWithValue(data.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __deleteBook = createAsyncThunk(
    "DELETE_BOOK",
    async (payload, thunkAPI) => {
        try{
            const data  = await axios.delete(`https://endpoint-for-booklist.herokuapp.com/book/${payload}`);
            return thunkAPI.fulfillWithValue(data.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __updateBook = createAsyncThunk(
    "UPDATE_BOOK_DONE",
    async (payload, thunkAPI) => {
        try{
            const data  = await axios.put(`https://endpoint-for-booklist.herokuapp.com/book/${payload.id}`, payload);
            return thunkAPI.fulfillWithValue(data.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const __getBookId = createAsyncThunk(
    "GET_BOOK_ID",
    async (payload, thunkAPI) => {
        try{
            const data  = await axios.get(`https://endpoint-for-booklist.herokuapp.com/book/${payload}`);
            return thunkAPI.fulfillWithValue(data.data);
        }catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        clearBook: (state) => {
            state.books = {
                id: 0,
                title: "",
                author: "",
                synopsis: "",
                isDone: false,
                isDeleted: false,
            };
        },
    },
    extraReducers: {
        [__getBooks.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
        },
        [__getBooks.pending]: (state) => {
            state.isLoading = true;
        },
        [__getBooks.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__addBook.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
            state.todos.push(action.payload);
        },
        [__addBook.pending]: (state) => {
            state.isLoading = true;
        },
        [__addBook.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [__deleteBook.fulfilled]: (state, action) => {
            const target = state.books.findIndex((book) => book.id === action.payload);
            state.books.splice(target, 1);
        },
        [__deleteBook.pending]: () => {},
        [__deleteBook.rejected]: () => {},
        [__updateBook.fulfilled]: (state, action) => {
            const target = state.books.findIndex((book) => book.id === action.payload.id);
            state.books[target] = action.payload;
        },
        [__updateBook.pending]: () => {},
        [__updateBook.rejected]: () => {},
        [__getBookId.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.books = action.payload;
        }

    },
});


export const { clearBook } = bookSlice.actions;
export default bookSlice.reducer;