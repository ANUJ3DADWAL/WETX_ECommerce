import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../features/userSlice.ts";
import authApi from "../api/authApi.ts";
import productApi from "../api/productApi.ts";
import cartApi from "../api/cartApi.ts";
import paymentApi from "../api/paymentApi.ts";
import orderApi from "../api/orderApi.ts";

const store = configureStore({
    reducer: {
        user: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            productApi.middleware,
            cartApi.middleware,
            paymentApi.middleware,
            orderApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
