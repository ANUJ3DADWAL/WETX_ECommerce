import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ProductResponseBody} from "../utils/types.ts";

const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL}),
    // baseQuery: fetchBaseQuery({baseUrl: "https://fakestoreapi.com"}),
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductResponseBody[], void>({
            query: () => '/product/getAllProducts'
            // query: () => '/products'
        }),

        getProductById: builder.query<ProductResponseBody, string>({
            query: (productId) => `/product/getProduct/${productId}`
            // query: (productId) => `/products/${productId}`
        }),

        createProduct: builder.mutation({
            query: (product) => ({
                url: '/product/createProduct',
                // url: '/product',
                method: "POST",
                body: product,
            })
        }),

        updateProduct: builder.mutation({
            query: (product) => ({
                url: '/product/updateProduct',
                // url: '/product',
                method: "PUT",
                body: product,
            })
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: '/product/deleteProduct',
                // url: '/product',
                method: "DELETE",
                body: {productId: productId},
            })
        }),

        searchProduct: builder.query<ProductResponseBody[], string>({
            query: (searchQuery) => `/product/searchProduct/${searchQuery}`
        })
    })
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useSearchProductQuery
} = productApi;
export default productApi;
