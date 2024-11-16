import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL + '/payment'}),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (userId) => ({
                url: `/createOrder/${userId}`,
                method: 'POST',
            })
        }),

        verifyPayment: builder.mutation({
            query: (paymentDetails) => ({
                url: '/verifyPayment',
                method: 'POST',
                body: paymentDetails
            })
        })
    })
});

export const {useCreateOrderMutation, useVerifyPaymentMutation} = paymentApi;
export default paymentApi;
