import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../services/apiSlice'
import authReducer from './authSlice'
import compareReducer from './compareSlice'
import languageReducer from './languageSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        compare: compareReducer,
        language: languageReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})