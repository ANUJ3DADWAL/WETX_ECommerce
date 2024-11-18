import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL}),
    endpoints: (builder) => ({
        getAllOrdersByUserId: builder.query({
            query: (userId: string) => `/order/getOrdersByUserId/${userId}`
        }),

        getOrderById: builder.query({
            query: (orderId: string) => `/order/getOrderById/${orderId}`
        }),

        insertOrder: builder.mutation({
            query: (orderDetails) => ({
                url: '/order/insertOrder',
                method: 'POST',
                body: orderDetails,
            })
        })
    })
});

export const {
    useGetAllOrdersByUserIdQuery,
    useGetOrderByIdQuery,
    useInsertOrderMutation
} = orderApi;
export default orderApi;
