import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AddToCartBody, CartBody, RemoveFromCartBody, UpdateCartItemBody} from "../utils/types.ts";

const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_SERVER_URL + '/cart'}),
    endpoints: (builder) => ({
        addToCart: builder.mutation<{ message: string }, AddToCartBody>({
            query: (body: AddToCartBody) => ({
                url: '/addItem',
                method: 'POST',
                body: body
            }),
        }),

        removeFromCart: builder.mutation<{ message: string }, RemoveFromCartBody>({
            query: (body: RemoveFromCartBody) => ({
                url: '/removeItem',
                method: 'POST',
                body: body
            }),
        }),

        updateCartItemQuantity: builder.mutation<{ message: string, cart: CartBody }, UpdateCartItemBody>({
            query: (body: UpdateCartItemBody) => ({
                url: '/updateQuantity',
                method: 'POST',
                body: body
            }),
        }),

        getCartByUserId: builder.query<CartBody[], string>({
            query: (userId) => `/getCart/${userId}`,
        }),

        checkIfInCartByUserIdAndProductId: builder.query<{ found: boolean }, { userId: string, productId: string }>({
            query: ({userId, productId}) => `/checkIfInCartByUserIdAndProductId/${userId}&${productId}`
        }),

        removeAllCartItemsByUserId: builder.mutation({
            query: (userId) => ({
                url: `/removeAllCartItemsByUserId/${userId}`,
                method: 'DELETE',
            })
        })
    })
});

export const {
    useAddToCartMutation,
    useRemoveFromCartMutation,
    useUpdateCartItemQuantityMutation,
    useGetCartByUserIdQuery,
    useCheckIfInCartByUserIdAndProductIdQuery,
    useRemoveAllCartItemsByUserIdMutation
} = cartApi;
export default cartApi;
