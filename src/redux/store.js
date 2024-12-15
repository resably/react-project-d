import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./ProductsSlice";
import salesReducer from "./salesSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        sales: salesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;