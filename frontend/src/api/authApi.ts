import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse, LoginFormData, SignupFormData, TokenVerifyResponse} from "../utils/types.ts";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL}),
    endpoints: (builder) => ({
        userLogin: builder.mutation<AuthResponse, LoginFormData>({
            query: (userData: LoginFormData) => ({
                url: '/user/login',
                method: "POST",
                body: userData,
            }),
        }),
        userSignup: builder.mutation<AuthResponse, SignupFormData>({
            query: (userData: SignupFormData) => ({
                url: '/user/signup',
                method: "POST",
                body: userData,
            }),
        }),
        getUserFromToken: builder.mutation<TokenVerifyResponse, string>({
            query: (token: string) => ({
                url: '/user/verifyToken',
                method: "POST",
                body: {token: token},
            })
        }),
        addDeliveryDetails: builder.mutation({
            query: ({userId, deliveryDetails}) => ({
                url: `/user/addDeliveryDetails/${userId}`,
                method: "POST",
                body: deliveryDetails,
            }),
        }),
    })
});

export const {
    useUserLoginMutation,
    useUserSignupMutation,
    useGetUserFromTokenMutation,
    useAddDeliveryDetailsMutation
} = authApi;
export default authApi;
