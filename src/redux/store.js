import { combineReducers, configureStore, } from "@reduxjs/toolkit";

import { ProductsSlice } from "../redux/productReducer";
import { filterProductsSlice } from "../redux/filterReducer";
import { cartSlice } from "../redux/cartReducer";


const rootReducer = combineReducers(
    {
        products: ProductsSlice.reducer,
        filterProducts: filterProductsSlice.reducer,
        cart: cartSlice.reducer,
    }
);


const store = configureStore(
    {
        reducer: rootReducer,
        devTools: true,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
            serializableCheck: false,
        }),
    }
);

export default store;