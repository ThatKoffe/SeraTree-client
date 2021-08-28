import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        username: "",
        userId: 0
    },
    reducers: {
        setToken: (state, token) => {
            state.token = token;
        },
        setUsername: (state, name) => {
            state.username = name;
        },
        setId: (state, id) => {
            state.userId = id;
        },
        clearToken: (state) => {
            state.token = null;
        }
    }
})

export const { setToken, clearToken, setId, setUsername } = authSlice.actions;
export default authSlice.reducer;