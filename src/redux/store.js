import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productsReducer from "./ProductsSlice";
import salesReducer from "./salesSlice";
import purchasesReducer from "./purchasesSlice";
import customerReducer from "./CustomerSlice";
import groupReducer from "./groupsSlice";


const store = configureStore({
    reducer: {
        user: userReducer,
        products: productsReducer,
        sales: salesReducer,
        customers: customerReducer,
        groups: groupReducer,
        purchases: purchasesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;