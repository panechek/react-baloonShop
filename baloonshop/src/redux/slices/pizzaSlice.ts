import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://64494ce6e7eb3378ca458a5d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${currentPage}&limit=4`
        );

    return data;
});

enum Status {
    LOADING = 'loading',
    SUCCESS = 'complited',
    ERROR = 'error,'
}

type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    rating: string;
}

interface PizzaSliceState {
     items: Pizza[];
     status: Status;
}

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,
};

export const pizzaSlice =  createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;      
                state.items = []; 
        }) 
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;       
        })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;  
                state.items = [];     
        });
    },
    });

export const selectPizzaData = (state: RootState) => state.pizza;
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;