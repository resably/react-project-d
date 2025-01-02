import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

//
export const savePurchase = createAsyncThunk(
    'purchases/savePurchase',
    async (purchaseData, { rejectWithValue }) => {
        try {
            // Firestore'a veri ekleyin
            const docRef = await addDoc(collection(db, "purchases"), purchaseData);
            return { id: docRef.id, ...purchaseData }; // Ekleme işlemi başarılıysa döndür
        } catch (error) {
            return rejectWithValue(error.message); // Hata durumunda hatayı döndür
        }
    }
);

// Update Product Stock for Purchases
export const updateProductStocks = createAsyncThunk(
    'purchases/updateProductStocks',
    async (products, { rejectWithValue }) => {
        try {
            for (const product of products) {
                const productRef = doc(db, "products", product.barcode); // Barkodla belgeyi bul
                const productSnap = await getDoc(productRef);

                if (productSnap.exists()) {
                    const currentStock = productSnap.data().stock || 0;
                    const newStock = currentStock + product.quantity;
                    const newPurchasePrice = product.price;
                    
                    
                    // Stok değerini güncelle
                    await updateDoc(productRef, { stock: newStock , purchasePrice: newPurchasePrice });
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

export const fetchPurchases = createAsyncThunk(
    'purchases/fetchPurchases',
    async (_, { rejectWithValue }) => {
        try {
            const purchasesCollection = collection(db, 'purchases'); // 'purchases' koleksiyonu
            const purchasesSnapshot = await getDocs(purchasesCollection);
            const purchases = purchasesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return purchases;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    purchases: [],
    status: "idle",
    error: null,
};

const purchasesSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(savePurchase.pending, (state) => {
                state.status = "loading";
            })
            .addCase(savePurchase.fulfilled, (state, action) => {
                state.status = "success";
                state.purchases.push(action.payload);
            })
            .addCase(savePurchase.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchPurchases.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPurchases.fulfilled, (state, action) => {
                state.status = "success";
                state.purchases = action.payload;
            })
            .addCase(fetchPurchases.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(updateProductStocks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateProductStocks.fulfilled, (state) => {
                state.status = "success";
            })
            .addCase(updateProductStocks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export default purchasesSlice.reducer;

