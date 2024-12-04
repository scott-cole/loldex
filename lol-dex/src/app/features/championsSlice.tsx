import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface championsState {
  data: [] | null,
  loading: boolean,
  error: string | null, 
}

const API_KEY = "?api_key=RGAPI-c4ed5a70-777e-48d9-8ce4-84cb6fc712ea";

const initialState: championsState = {
  data: [],
  loading: false,
  error: "",
}

export const getAllChampions = createAsyncThunk("champions", async() => {
  const response = await fetch("https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/champion.json" + API_KEY)
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
})

export const championsSlice = createSlice({
  name: 'champions',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
    .addCase(getAllChampions.pending,(state) => {
        state.loading = true
    })
    .addCase(getAllChampions.fulfilled,(state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload
    })
    .addCase(getAllChampions.rejected,(state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.data = []
    })
  }
})

export default championsSlice.reducer