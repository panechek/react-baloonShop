import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
    const { sortBy, order, category, search, page } = params;
    const { data } = await axios.get(
        `https://64494ce6e7eb3378ca458a5d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${page}&limit=4`);
        console.log(data);
        return data;
})

const initialState = {
    items: [],
    status: 'loading',
};

export const pizzaSlice =  createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';      
                state.items = []; 
        }) 
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';       
        })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = 'error';  
                state.items = [];     
        });
    },
    });


export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;