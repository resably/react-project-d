import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";




const initialState = {
    isAuth: false,
    user: null
};

export const userSlice = createSlice({
    name: "user",
    initialState : initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
        }
    },

    extraReducers: (builder) => {

    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;