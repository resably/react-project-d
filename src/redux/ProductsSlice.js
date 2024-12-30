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
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

// Add Product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", product.barcode); // Document ID = Barkod
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        return rejectWithValue("Bu barkod ile zaten bir ürün mevcut.");
      }

      await setDoc(productRef, {
        barcode: product.barcode,
        name: product.name,
        brand: product.brand,
        category: product.category,
        subCategory: product.subCategory,
        stock: product.stock,
        purchasePrice: product.purchasePrice,
        price: product.price,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
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

      // Update the product
      await updateDoc(productRef, updatedProduct);

      return { id, ...updatedProduct };
    } catch (error) {
      return rejectWithValue("Ürün güncelleme sırasında bir hata oluştu.");
    }
  }
);

// Delete Product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", id);

      // Delete the product
      await deleteDoc(productRef);

      return id;
    } catch (error) {
      return rejectWithValue("Ürün silme sırasında bir hata oluştu.");
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
        id: doc.id, // Document ID
        ...doc.data(), // Document Data
      }));

      return products;
    } catch (error) {
      return rejectWithValue("Ürünler alınırken bir hata oluştu.");
    }
  }
);

// Add Category
export const addCategory = createAsyncThunk(
  "products/addCategory",
  async (category, { rejectWithValue }) => {
    try {
      const categoryRef = doc(db, "categories", category.name);
      const categorySnap = await getDoc(categoryRef);

      if (categorySnap.exists()) {
        return rejectWithValue("Bu kategori zaten mevcut.");
      }

      await setDoc(categoryRef, {
        name: category.name,
        subCategories: category.subCategories,
        description: category.description,
        createdAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
      });

      return { id: category.name, ...category };
    } catch (error) {
      return rejectWithValue("Kategori ekleme sırasında bir hata oluştu.");
    }
  }
);

// Fetch Categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categoriesCollection = collection(db, "categories");
      const snapshot = await getDocs(categoriesCollection);

      const categories = snapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(), // Document Data
      }));

      return categories;
    } catch (error) {
      return rejectWithValue("Kategoriler alınırken bir hata oluştu.");
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const categoryRef = doc(db, "categories", id);

      await deleteDoc(categoryRef);

      return id;
    } catch (error) {
      return rejectWithValue("Kategori silme sırasında bir hata oluştu.");
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  "products/updateCategory",
  async ({ id, updatedCategory }, { rejectWithValue }) => {
    try {
      const categoryRef = doc(db, "categories", id);

      await updateDoc(categoryRef, updatedCategory);

      return { id, ...updatedCategory };
    } catch (error) {
      return rejectWithValue("Kategori güncelleme sırasında bir hata oluştu.");
    }
  }
);

// Add Subcategory
export const addSubcategory = createAsyncThunk(
  "products/addSubcategory",
  async ({ parentId, subCategoryName }, { rejectWithValue }) => {
    try {
      // Ana kategoriyi referans al
      const parentCategoryRef = doc(db, "categories", parentId);

      // Ana kategori var mı kontrolü
      const parentCategorySnap = await getDoc(parentCategoryRef);
      if (!parentCategorySnap.exists()) {
        return rejectWithValue("Ana kategori bulunamadı.");
      }

      // Firestore'daki subCategories dizisine alt kategori adı ekle
      await updateDoc(parentCategoryRef, {
        subCategories: arrayUnion(subCategoryName),
        lastUpdated: new Date().toISOString(),
      });

      return { parentId, subCategoryName };
    } catch (error) {
      return rejectWithValue("Alt kategori ekleme sırasında bir hata oluştu.");
    }
  }
);

const initialState = {
  items: [],
  categories: [],
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
      .addCase(addProduct.pending, (state) => {
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

      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.status = "idle";
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Add Category
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.status = "idle";
        state.error = null;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
        state.status = "idle";
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const updatedIndex = state.categories.findIndex(
          (category) => category.id === action.payload.id
        );
        if (updatedIndex !== -1) {
          state.categories[updatedIndex] = action.payload;
        }
        state.status = "idle";
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Add Subcategory
      .addCase(addSubcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addSubcategory.fulfilled, (state, action) => {
        const updatedIndex = state.categories.findIndex(
          (category) => category.id === action.payload.parentId
        );
        if (updatedIndex !== -1) {
          state.categories[updatedIndex].subCategories.push(
            action.payload.subCategoryName
          );
        }
        state.status = "idle";
        state.error = null;
      })
      .addCase(addSubcategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
