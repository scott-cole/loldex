import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ChampionsState, ChampionsResponse } from "./types";

const initialState: ChampionsState = {
  data: null,
  loading: false,
  error: null,
}

const API_KEY = "RGAPI-c4ed5a70-777e-48d9-8ce4-84cb6fc712ea";

export const BASE_URL = "https://ddragon.leagueoflegends.com/cdn/12.4.1"

export const getAllChampions = createAsyncThunk("champions/getAllChampions", async () => {
  const response = await fetch(
    `${BASE_URL}/data/en_US/champion.json?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data as ChampionsResponse;
});

export const championsSlice = createSlice({
  name: "champions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllChampions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllChampions.fulfilled, (state, action: PayloadAction<ChampionsResponse>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getAllChampions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch champions";
        state.data = null;
      });
  },
});

export default championsSlice.reducer;