import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("user/fetchPosts", (params) => {
  const apiKey = process.env.REACT_APP_APIKEY;
  let param1 = params.latitude;
  let param2 = params.longitude;
  return axios
    .get(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        param1 +
        "&lon=" +
        param2 +
        "&units=metric&appid=" +
        apiKey
    )
    .then((response) => response.data);
});

export const positionSlice = createSlice({
  name: "position",
  initialState: {
    currentPosition: { latitude: 0, longitude: 0 },
    loading: false,
    postcontent: [],
    error: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.postcontent = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.postcontent = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    currentPosition: (state, action) => {
      state.currentPosition.latitude = action.payload.latitude;
      state.currentPosition.longitude = action.payload.longitude;
    },
  },
});

// Action creators are generated for each case reducer function
export const { currentPosition } = positionSlice.actions;

export default positionSlice.reducer;
