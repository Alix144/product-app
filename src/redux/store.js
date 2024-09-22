import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/redux/features/counter'

export const store = configureStore({
    reducer: {
      counter: counterReducer
    }
  })
