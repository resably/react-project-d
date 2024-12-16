import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Add Product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", product.barcode); // Belge ID'si = Barkod
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        return rejectWithValue("Bu barkod ile zaten bir ürün mevcut.");
      }

      await setDoc(productRef, {
        barcode: product.barcode,
        name: product.name,
        brand: product.brand,
        category: product.category,
        stock: product.stock,
        purchasePrice: product.purchasePrice,
        price: product.price,
      });

      return { id: product.barcode, ...product };
    } catch (error) {
      return rejectWithValue("Ürün ekleme sırasında bir hata oluştu.");
    }
  }
);

// Update Product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, updatedProduct }, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", id);

      // Belgeyi güncelle
      await updateDoc(productRef, updatedProduct);

      return { id, ...updatedProduct };
    } catch (error) {
      return rejectWithValue("Ürün güncelleme sırasında bir hata oluştu.");
    }
  }
);

// Fetch Products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const productsCollection = collection(db, "products");
      const snapshot = await getDocs(productsCollection);

      const products = snapshot.docs.map((doc) => ({
        id: doc.id, // Belge ID'si
        ...doc.data(), // Firestore'daki veriler
      }));

      return products;
    } catch (error) {
      return rejectWithValue("Ürünler alınırken bir hata oluştu.");
    }
  }
);

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Product
      .addCase(addProduct.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "idle";
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedIndex = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.items[updatedIndex] = action.payload;
        }
        state.status = "idle";
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Products
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
