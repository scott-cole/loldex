import { configureStore } from '@reduxjs/toolkit'
import championsReducer from "../app/features/championsSlice"

export const store = configureStore({
  reducer: {
    champions: championsReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch