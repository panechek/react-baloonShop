import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { calcTotalCount } from "../../utils/calcTotalCount";

export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}

interface CartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartItem[];
};

const { items, totalPrice, totalCount} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice: totalPrice,
    totalCount: totalCount,
    items: items,
};

export const cartSlice =  createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            findItem ? findItem.count++ : state.items.push ({
                ...action.payload,
                count: 1,
            });
            state.totalPrice = calcTotalPrice(state.items);

            state.totalCount = calcTotalCount(state.items);
        },
        changeCount(state, action: PayloadAction<{
            id: string;
            sign: '-' | '+';
        }>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
               action.payload.sign === '+' ? findItem.count++ : findItem.count--; 
            }
            
            state.totalPrice = calcTotalPrice(state.items);

            state.totalCount = calcTotalCount(state.items);
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
            state.totalCount = calcTotalCount(state.items);
        },
         clearCart(state) {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
         }
    },
}); 

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state:RootState) => state.cart.items.find((obj) => obj.id === id)
export const { addItem, removeItem, changeCount, clearCart } = cartSlice.actions;
export default cartSlice.reducer;