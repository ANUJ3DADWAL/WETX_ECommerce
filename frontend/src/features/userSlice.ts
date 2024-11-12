import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserSliceState, UserState} from "../utils/types.ts";

const initialState: UserSliceState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
};

type UserSlicePayloadState = Omit<UserSliceState, "isAuthenticated">;

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<UserSlicePayloadState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token ?? '');
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("token");
        },
        signup: (state, action: PayloadAction<UserSlicePayloadState>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;
            localStorage.setItem("token", action.payload.token ?? '');
        },
        setUser: (state, action: PayloadAction<UserState>) => {
            state.user = action.payload;
        },
    },
});

export const {login, logout, signup, setUser} = userSlice.actions;
export default userSlice.reducer;
