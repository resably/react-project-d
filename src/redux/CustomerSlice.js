import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc, increment, getDoc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const addCustomer = createAsyncThunk(
    "customers/addCustomer",
    async (newCustomerData, { rejectWithValue }) => {
        try {
            // 1. Sayaç belgesini al
            const counterRef = doc(db, "meta", "customersCounter");
            const counterSnap = await getDoc(counterRef);

            let nextId;
            if (counterSnap.exists()) {
                // 2. Sayaç değerini artır
                await updateDoc(counterRef, { value: increment(1) });

                // 3. Yeni sayaç değerini al
                const updatedCounterSnap = await getDoc(counterRef);
                nextId = updatedCounterSnap.data().value;
            } else {
                // Sayaç yoksa başlangıç değerini oluştur
                await setDoc(counterRef, { value: 1 });
                nextId = 1;
            }

            // 4. Yeni müşteriyi kaydet
            const customerRef = doc(db, "customers", nextId.toString());
            await setDoc(customerRef, newCustomerData);

            return { id: nextId, ...newCustomerData };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
    try {
        const customersCollection = collection(db, 'customers');
        const snapshot = await getDocs(customersCollection);

        const customers = snapshot.docs.map(doc => ({
            id: doc.id, // Firestore ID'si
            ...doc.data() // Belge verisi
        }));
        return customers;
    } catch (error) {
        return error.message;
    }
});



const initialState = {
    customers: [],
    status: "idle",
    error: null,
};

const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCustomer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addCustomer.fulfilled, (state, action) => {
                state.customers.push(action.payload);
                state.status = "idle";
                state.error = null;
            })
            .addCase(addCustomer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchCustomers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCustomers.fulfilled, (state, action) => {
                state.customers = action.payload;
                state.status = "idle";
                state.error = null;
            })
            .addCase(fetchCustomers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default customerSlice.reducer;
