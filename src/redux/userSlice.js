import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

//login
export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userId = user.uid;

        const data = {
            user: user,
            userId: userId
        }

        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

//logout
export const logout = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        await signOut(auth);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});



// i think of using this 2nd ep.
// currently its only for sidebar controller ^^

const initialState = {
    isAuth: false,
    user: null,
    userId: null,
    error: null,
    isSidebarOpen: true,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
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
        builder.addCase(login.pending, (state) => {
            state.isAuth = false;
            state.user = null;
            state.userId = null;
            state.error = null;
        });

        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.userId = action.payload.userId;
            state.isAuth = true;
        });

        builder.addCase(login.rejected, (state, action) => {
            state.isAuth = false;
            state.error = "E-posta veya şifre hatalı.";
            state.user = null;
            state.userId = null;
        })

        builder.addCase(logout.pending, (state) => {
            state.isAuth = true;
            state.user = null;
            state.userId = null;
            state.error = null;
        });

        builder.addCase(logout.fulfilled, (state) => {
            state.isAuth = false;
            state.user = null;
            state.userId = null;
        })

        builder.addCase(logout.rejected, (state, action) => {
            state.isAuth = true;
            state.user = null;
            state.userId = null;
            state.error = action.payload;
        });
    }
});

export const { toggleSidebar, openSidebar, closeSidebar } = userSlice.actions;
export default userSlice.reducer;