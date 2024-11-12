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
        })
    })
});

export const {useUserLoginMutation, useUserSignupMutation, useGetUserFromTokenMutation} = authApi;
export default authApi;