import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../config/globals';

const initialState = {
  post: {},
  isLoading: true,
  state: {},
  error: '',
};

export const fetchPosts = createAsyncThunk(('post/fetchPosts'), () => (
  axios
    .get(`${API_URL}/posts`)
    .then((response) => response.data)
));

export const createPost = createAsyncThunk(('post/createPost'), () => {
  // const filePath = path.join(__dirname, '../../');
  // console.log(__dirname);
  // const data = fs.readFile(filePath)
  //   .then((response) => response);
  // console.log(data);
  // return data;
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPost: (state, { payload }) => {
      state.post = [...payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
