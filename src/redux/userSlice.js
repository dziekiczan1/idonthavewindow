import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  postcontent: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchPosts = createAsyncThunk("user/fetchPosts", () => {
  return axios
    .get("https://memories.piotr.rzadkowolski.dev/api/posts")
    .then((response) => response.data);
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.postcontent = action.payload.data;
      console.log(action.payload.data);
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.postcontent = [];
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
