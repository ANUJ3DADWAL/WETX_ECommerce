import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
    reducerPath: 'paymentApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL}),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (userId) => ({
                url: `/payment/createOrder/${userId}`,
                method: 'POST',
            })
        }),

        verifyPayment: builder.mutation({
            query: (paymentDetails) => ({
                url: '/payment/verifyPayment',
                method: 'POST',
                body: paymentDetails
            })
        }),

        addTransaction: builder.mutation({
            query: (transactionDetails) => ({
                url: '/transaction/addTransaction',
                method: 'POST',
                body: transactionDetails,
            })
        })
    })
});

export const {useCreateOrderMutation, useVerifyPaymentMutation, useAddTransactionMutation} = paymentApi;
export default paymentApi;
