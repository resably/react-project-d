import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

//
export const fetchSales = createAsyncThunk("sales/fetchSales", async () => {
    const querySnapshot = await getDocs(collection(db, "sales"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

//
export const addSale = createAsyncThunk("sales/addSale", async (sale) => {
    const docRef = await addDoc(collection(db, "sales"), sale);
    return { id: docRef.id, ...sale };
});

const salesSlice = createSlice({
    name: "sales",
    initialState: { items: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(addSale.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    },
});

export default salesSlice.reducer;
