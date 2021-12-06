import { createSlice, createAsyncThunk,current } from "@reduxjs/toolkit";
import axios from 'axios';

//看localStorage是否有購物車資料了
const getLocalStorage = () => {
    let cart = localStorage.getItem('cart')
    //有資料就給localstorage內的資料
    if (cart) {
        //console.log('cart', cart);
        return JSON.parse(localStorage.getItem('cart'))
    } else { //沒資料給空陣列
        //console.log('no items in the cart');
        return []
    }
}

const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 10,
}

export const cartSlice = createSlice(
    {
        name: 'Cart',
        initialState: initialState,
        reducers: {
            addToCart(state, action){
                const {id, mainColor, amount, product} = action.payload;
                //console.log('cart state', current(state.cart))
                const tempItem = state.cart.find((i) => i.id === id + mainColor) //找看看被加入購物車之產品是否已存在車內
                
                if(tempItem){ //item 已在購物車中
                    //遶行購物車所有產品, 找到此次加入之產品
                    //console.log('在購物車中')
                    state.cart.map((cartItem) => { 
                        if (cartItem.id === id + mainColor) {//產品與此種顏色已經存在購物車中
                        let newAmount = cartItem.amount + amount //只需增加購物車內產品數量
                        if (newAmount > cartItem.max) {//檢查是否超過庫存量
                            newAmount = cartItem.max; //超過就設定為最大庫存量
                        }
                        cartItem.amount = newAmount;
                        } 
                        else { //產品在購物車中, 但顏色不對
                            cartItem = cartItem;
                        }
                    })
                    //console.log('cart state', current(state.cart))
                }
                else{ //item 不在購物車中
                    //console.log('不在購物車中')
                    const newItem = {
                        id: id + mainColor,
                        name: product.name,
                        mainColor,
                        amount,
                        image: product.images[0].url,
                        price: product.price,
                        max: product.stock //產品目前庫存量
                    }
                    state.cart.push(newItem);
                    //console.log('cart state', current(state.cart));
                }
           },

           clearCart(state, action){
            state.cart = [];
           },

           removeItem(state, action){
            //console.log('item id', action.payload);
            state.cart = state.cart.filter((item) => item.id !== action.payload);
           },

           //action.payload: increasing / decreasing
           toggleAmount(state, action){
            const {id, value} = action.payload;
            
            state.cart.map((item) => {
                if(item.id === id){
                    if(value === 'inc'){
                        item.amount++
                        if(item.amount > item.max){
                            item.amount = item.max;
                        }
                    }
                    if(value === 'desc'){
                        item.amount--
                        if(item.amount < 1){
                            item.amount = 1;
                        }
                    }
                }else{
                    state.item = item;
                }
            })

           },

           countCartTotlas(state, action){
            const { total_items, total_amount } = state.cart.reduce(
                (total, cartItem) => {
                  const { amount, price } = cartItem
                  total.total_items += amount
                  total.total_amount += price * amount
                  //console.log('cartItem', cartItem);
                  return total
                },
                {
                  total_items: 0,
                  total_amount: 0,
                }
            )
            state.total_items = total_items;
            state.total_amount = total_amount;
           }

        },

        extraReducers: {
          
        }
    }
);

export const cartActions = cartSlice.actions;
