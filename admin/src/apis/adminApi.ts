import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Product} from "../utils/types.ts";

const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL}),
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (loginData) => ({
                url: '/admin/login',
                method: 'POST',
                body: loginData
            })
        }),

        addProduct: builder.mutation<{message: string, product: Product}, Product>({
            query: (productDetails) => ({
                url: '/product/createProduct',
                method: 'POST',
                body: productDetails,
            })
        }),

        getAllProducts: builder.query<Product[], void>({
            query: () => '/product/getAllProducts'
        }),

        getProductById: builder.query<Product, string>({
            query: (productId) => `/product/getProduct/${productId}`
        }),

        updateProduct: builder.mutation<{message: string, product: Product}, Product>({
            query: (productDetails) => ({
                url: '/product/updateProduct',
                method: 'PUT',
                body: productDetails,
            })
        }),

        deleteProduct: builder.mutation<{message: string}, string>({
            query: (productId) => ({
                url: `/product/deleteProduct/${productId}`,
                method: 'DELETE',
            })
        }),
    })
})

export const {useAdminLoginMutation, useAddProductMutation, useGetAllProductsQuery, useGetProductByIdQuery, useUpdateProductMutation, useDeleteProductMutation} = adminApi;
export default adminApi;
