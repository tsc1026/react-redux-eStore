import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products_url as url } from '../utils/constants';
import axios from 'axios';

const initialState = {
    //for sidebar open/close
    isSidebarOpen: false,

    //for all products
    products_loading: false,
    products_error: false,
    products: [],
    featured_products: [], //prodcuts 中會有欄位為 feature, 為 T 就可以放入此陣列

    //for a single product
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
}

export const getProducts = createAsyncThunk(
    "Products/getProducts",
    async() => {
        const response = await axios.get(url);
        //console.log(response);
        return response;
    }
)

export const fetchSingleProduct = createAsyncThunk(
    "Products/fetchSingleProduct",
    async(combinedUrl, thunkAPI) => {
        //console.log('single prod combinedUrl', combinedUrl);
        const response = await axios.get(combinedUrl);
        //console.log('single prod response', response);
        return response;
    }
)

export const ProductsSlice = createSlice(
    {
        name: 'Products',
        initialState,
        reducers: {
            openSidebar(state, action) {
                state.isSidebarOpen = true;
            },
            closeSidebar(state, action){
                state.isSidebarOpen = false;
            },

        },

        extraReducers: {
            //getProducts
            [getProducts.pending.type]: (state) => {
                state.products_loading = true;
            },
            [getProducts.fulfilled.type]: (state, action) => {
                //console.log('fullfield', action.payload); //server 回傳原始資料
                state.products_loading = false;
                state.products =  action.payload.data; //取得所有 products
                //取得所有 featured products
                state.featured_products = action.payload.data.filter( 
                    (product) => product.featured === true
                )
                //console.log('featured prods', state.featured_products);
            },
            [getProducts.rejected.type]: (state) => {
                state.products_loading = false;
                state.products_error = true;
            },

            //get a single product
            [fetchSingleProduct.pending.type]: (state) => {
                state.single_product_loading = true;
                state.single_product_error = false;
            },
            [fetchSingleProduct.fulfilled.type]: (state, action) => {
                state.single_product_loading = false;
                state.single_product_error = false;
                //('single prod', action.payload);
                state.single_product =  action.payload.data; 
                
            },
            [fetchSingleProduct.rejected.type]: (state) => {
                state.single_product_loading = false;
                state.single_product_error = true;
            },
        }
    }
);

export const ProductsActions = ProductsSlice.actions;
