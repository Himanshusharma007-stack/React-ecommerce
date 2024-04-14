import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import cartReducer from './features/cart/cartSlice'
// import counterReducer from '../features/counter/counterSlice'
import bannerReducer from './features/banner/bannerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cartArr: cartReducer,
    banner: bannerReducer
  },
})