import {configureStore} from "@reduxjs/toolkit";
import adminApi from "../apis/adminApi.ts";

const store = configureStore({
    reducer: {
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(adminApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
