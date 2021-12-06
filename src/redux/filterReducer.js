import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

let initialState = {
    all_products: [], //所有產品
    filtered_products: [], //過濾後產品
    grid_view: false, //切換不同 view
    sort: 'price-lowest', //初始 sort condition
    filters: {
      text: '',
      company: 'all',
      category: 'all',
      color: 'all',
      min_price: 0,
      max_price: 0,
      price: -1,
      shipping: false,
    },
}

export const filterProductsSlice = createSlice(
    {
        name: 'filterProducts',
        initialState,
        reducers: {
             //取得產品中最高價
            load_product(state, action){
              //console.log('filterProducts prods', action.payload);
              let maxPrice = action.payload.map((p) => p.price)
              maxPrice = Math.max(...maxPrice)
              
              state.all_products = action.payload;
              state.filtered_products = action.payload;
              state.filters.max_price = maxPrice;
              state.filters.price = maxPrice;
             
              //console.log('state', current(state.filters));
            },
            //更新state.filters
            update_filters(state, action){
              const { name, value } = action.payload;
              if(name === 'text'){
                state.filters.text = value;
              }
              if(name === 'category'){
                state.filters.category = value;
              }
              if(name === 'company'){
                state.filters.company = value;
              }
              if(name === 'color'){
                state.filters.color = value;
              }
              if(name === 'price'){
                state.filters.price = value;
                //console.log(' state.filters.price', state.filters.price);
              }
              if(name === 'shipping'){
                state.filters.shipping = value;
                //console.log(' state.filters.price', state.filters.price);
              }
            },
            //依照 state.filters 設置條件去執行 filter prods
            filter_product(state, action){
              let tempProducts = current(state.all_products);
              
              // text
              let text = state.filters.text;
              if (text) {
                tempProducts = tempProducts.filter((product) => {
                  return product.name.toLowerCase().startsWith(text)
                })
                state.filtered_products = tempProducts;
              }

              // category
              let category = state.filters.category;
              if (category !== 'all') {
                tempProducts = tempProducts.filter(
                  (product) => product.category === category
                )
                state.filtered_products = tempProducts;
              }

              // company
              let company = state.filters.company;
              if (company !== 'all') {
                tempProducts = tempProducts.filter(
                  (product) => product.company === company
                )
                state.filtered_products = tempProducts;
              }

              // colors
              let color = state.filters.color;
              if (color !== 'all') {
                tempProducts = tempProducts.filter((product) => {
                  return product.colors.find((c) => c === color)
                })
                state.filtered_products = tempProducts;
              }

              // price
              let price = state.filters.price;
              if(price > -1){
                tempProducts = tempProducts.filter((product) => product.price <= price)
                state.filtered_products = tempProducts;
              }

               // shipping
               let shipping = state.filters.shipping;
               if(shipping !== false){
                tempProducts = tempProducts.filter((product) => product.shipping === true)
                state.filtered_products = tempProducts;
               }
             
            },
            //清除filter conditions
            clear_filters(state, action){
              state.filters.text = '';
              state.filters.company = 'all';
              state.filters.category = 'all';
              state.filters.color = 'all';
              state.filters.price = state.filters.max_price;
              state.filters.shipping = false;
            },
            setGridView(state, action){
                state.grid_view = true;
            },
            setListView(state, action){
                state.grid_view = false;
            },
            //改變 sort condition state
            updateSort(state, action){
                //console.log(action.payload); //including name & value
                state.sort = action.payload.value;
                //console.log(state.sort);
            },
            //依照sort condition state 真正去排序
            sortProducts(state, action){
                let tempProducts = state.filtered_products; //取出 filtered product assing to tempProducts
                let sort = state.sort; //取出 sort 方式

                //判斷 sort 方式
                if (sort === 'price-lowest') {
                  tempProducts = tempProducts.sort((a, b) => {
                    if (a.price < b.price) {
                      return -1
                    }
                    if (a.price > b.price) {
                      return 1
                    }
                    return 0
                  })
                }

                if (sort === 'price-highest') {
                  tempProducts = tempProducts.sort((a, b) => b.price - a.price)
                }

                if (sort === 'name-a') {
                  tempProducts = tempProducts.sort((a, b) => {
                    //這裡的 a.name & b.name 就是從 tempProducts product 取出之 porduct nmae 然後做比較
                    //console.log('temp name', a.name);
                    return a.name.localeCompare(b.name)
                  })
                }
                
                if (sort === 'name-z') {
                  tempProducts = tempProducts.sort((a, b) => {
                    return b.name.localeCompare(a.name)
                  })
                }
            },
           
        },

        extraReducers: {
           
        }
    }
);

export const filterProductsActions = filterProductsSlice.actions;