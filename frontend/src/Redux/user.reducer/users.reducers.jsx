import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HOST_URL, SIGNIN_URL, SIGNUP_URL } from '../../config/globals';

const initialState = {
  user: {},
  isLoading: false,
  state: {},
  error: {},
  signedIn: false,
  success: false,
};
export const signUp = createAsyncThunk(('user/signUp'), (data, { rejectWithValue }) => (
  axios
    .post(SIGNUP_URL, data)
    .then((response) => response.data)
    .catch((err) => rejectWithValue({ ...err }))));

export const signIn = createAsyncThunk(('user/signIn'), (data, { rejectWithValue }) => (
  axios
    .post(SIGNIN_URL, { ...data })
    .then((response) => response.data)
    .catch((err) => rejectWithValue({ ...err }))));

export const verifyToken = createAsyncThunk(('user/verifyToken'), (data, { rejectWithValue }) => (
  axios
    .get(`${HOST_URL}/users/tokens/info`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
    .then((response) => response.data)
    .catch((err) => rejectWithValue({ ...err }))));

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = [...payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = {};
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
        state.error = '';
        state.success = false;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = {};
        state.user = action.payload;
        state.success = true;
        localStorage.setItem('token', JSON.stringify(action.payload.token));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(verifyToken.pending, (state) => {
        state.success = false;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.success = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
