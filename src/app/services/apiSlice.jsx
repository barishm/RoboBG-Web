import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000/"}),
    // baseQuery: fetchBaseQuery({baseUrl:"https://api.barishm.com/"}),
    endpoints: () => ({})
})