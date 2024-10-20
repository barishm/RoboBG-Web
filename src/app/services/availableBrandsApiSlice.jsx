import { apiSlice } from "./apiSlice";

export const availableBrandsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAvailableBrands: builder.query({
            query: () => ({
                url: `v1/available-brands`,
                method: 'GET',
            }),
            providesTags: ['Robot'],
        }),

    })
})

export const {useGetAvailableBrandsQuery} = availableBrandsApiSlice;
