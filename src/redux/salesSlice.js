import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

//
export const saveSale = createAsyncThunk(
    'sales/saveSale',
    async (saleData, { rejectWithValue }) => {
        try {
            // Firestore'a veri ekleyin
            const docRef = await addDoc(collection(db, "sales"), saleData);
            return { id: docRef.id, ...saleData }; // Ekleme işlemi başarılıysa döndür
        } catch (error) {
            return rejectWithValue(error.message); // Hata durumunda hatayı döndür
        }
    }
);

// Update Product Stock
export const updateProductStocks = createAsyncThunk(
    'sales/updateProductStocks',
    async (products, { rejectWithValue }) => {
        try {
            for (const product of products) {
                const productRef = doc(db, "products", product.barcode); // Barkodla belgeyi bul
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const currentStock = productSnap.data().stock || 0;
                    const newStock = currentStock - product.quantity;

                    if (newStock < 0) {
                        throw new Error(
                            `${product.name} için yeterli stok yok. Mevcut stok: ${currentStock}`
                        );
                    }

                    // Stok değerini güncelle
                    await updateDoc(productRef, { stock: newStock });
                } else {
                    throw new Error(`${product.name} (Barkod: ${product.barcode}) bulunamadı.`);
                }
            }

            return "Stoklar başarıyla güncellendi!";
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSales = createAsyncThunk(
    'sales/fetchSales',
    async (_, { rejectWithValue }) => {
        try {
            const salesCollection = collection(db, 'sales');
            const salesSnapshot = await getDocs(salesCollection);
            const sales = salesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return sales;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    sales: [],
    status: "idle",
    error: null,
};


const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveSale.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(saveSale.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sales.push(action.payload);
            })
            .addCase(saveSale.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateProductStocks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateProductStocks.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(updateProductStocks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchSales.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.sales = action.payload;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });

    },
});

export default salesSlice.reducer;
