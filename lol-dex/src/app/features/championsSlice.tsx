import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface championsState {
  data: [] | null,
  loading: boolean,
  error: string | null, 
}

const initialState: championsState = {
  data: [],
  loading: false,
  error: "",
}

// url is wrong - find correct data api, forbidden ?? WTF
export const getAllChampions = createAsyncThunk("champions", async() => {
    fetch("https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/champion")
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