import { apiSlice } from "./apiSlice";

export const consumableSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createConsumable: builder.mutation({
            query: ({json,accessToken}) => ({
                url: 'v1/moderator/consumable',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: json,
            }),
            invalidatesTags: ['Consumable'],
        }),
        updateConsumable: builder.mutation({
            query: ({json,accessToken}) => ({
                url: 'v1/moderator/consumable',
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: json,
            }),
            invalidatesTags: ['Consumable'],
        }),
        deleteConsumable: builder.mutation({
            query: ({id,accessToken}) => ({
                url: `v1/moderator/consumable/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
            invalidatesTags: ['Consumable'],
        }),
        getAllConsumables: builder.query({
            query: () => ({
                url: `v1/consumable`,
                method: 'GET'
            }),
            providesTags: ['Consumable'],
        }),
    })
})

export const {
    useCreateConsumableMutation,
    useUpdateConsumableMutation,
    useDeleteConsumableMutation,
    useGetAllConsumablesQuery
} = consumableSlice;