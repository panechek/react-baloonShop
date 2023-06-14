import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    totalCount: 0,
    items: [],
};

export const cartSlice =  createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            findItem ? findItem.count++ : state.items.push ({
                ...action.payload,
                count: 1,
            });
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price*obj.count + sum;
            }, 0);
            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        changeCount(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            action.payload.sign === '+' ? findItem.count++ : findItem.count--;
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price*obj.count + sum;
            }, 0);
            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
        removeItem(state, action) {
            console.log(action.payload);
            state.items = state.items.filter(obj => obj.id !== action.payload);
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price*obj.count + sum;
            }, 0);
            state.totalCount = state.items.reduce((sum, obj) => {
                return obj.count + sum;
            }, 0);
        },
         clearCart(state) {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
         }
    },
}); 

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) => state.cart.items.find((obj) => obj.id === id)
export const { addItem, removeItem, changeCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;