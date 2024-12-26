import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./ProductsSlice";
import salesReducer from "./salesSlice";
import customerReducer from "./CustomerSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        sales: salesReducer,
        customers: customerReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;