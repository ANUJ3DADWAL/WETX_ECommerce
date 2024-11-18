import {configureStore} from "@reduxjs/toolkit";
import adminApi from "../apis/adminApi.ts";
import adminSlice from "../features/adminSlice.ts";

const store = configureStore({
    reducer: {
        admin: adminSlice,
        [adminApi.reducerPath]: adminApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(adminApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

export default store;
