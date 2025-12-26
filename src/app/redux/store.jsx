import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from 'src/app/services/apiSlice'
import authReducer from 'src/app/redux/authSlice'
import compareReducer from 'src/app/redux/compareSlice'
import languageReducer from 'src/app/redux/languageSlice';

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