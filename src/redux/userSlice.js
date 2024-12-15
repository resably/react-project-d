import { createSlice } from "@reduxjs/toolkit";


// i think of using this 2nd ep.
// currently its only for sidebar controller ^^

const initialState = {
    isAuth: true,
    user: null,
    isSidebarOpen: true,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuth = false;
            state.user = null;
        },
        toggleSidebar(state) {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
        openSidebar(state) {
            state.isSidebarOpen = true;
        },
        closeSidebar(state) {
            state.isSidebarOpen = false;
        },
    },

    extraReducers: (builder) => {

    }
});

export const { login, logout, toggleSidebar, openSidebar, closeSidebar } = userSlice.actions;
export default userSlice.reducer;