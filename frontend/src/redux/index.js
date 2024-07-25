import {configureStore } from '@reduxjs/toolkit'

import usersliceReducer from './userslice'
import productslidereducer from './productslide'

export const store = configureStore({
    reducer: {
      user:usersliceReducer,
      product:productslidereducer
    }
  })