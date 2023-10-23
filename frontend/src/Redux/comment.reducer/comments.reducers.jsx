import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import fs from 'fs';
// import path from 'path';
import { API_URL } from '../../config/globals';

const initialState = {
  comment: {},
  isLoading: true,
  state: {},
  error: '',
};

export const fetchComments = createAsyncThunk(('comment/fetchComments'), () => (
  axios
    .get(API_URL)
    .then((response) => response.data)
));

export const fetchData = createAsyncThunk(('comment/fetchData'), () => {
  // const filePath = path.join(__dirname, '../../');
  // console.log(__dirname);
  // const data = fs.readFile(filePath)
  //   .then((response) => response);
  // console.log(data);
  // return data;
});

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setcomment: (state, { payload }) => {
      state.comment = [...payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comment = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setcomment } = commentSlice.actions;
export default commentSlice.reducer;
