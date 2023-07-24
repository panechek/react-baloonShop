import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sortBy, order, category, search, currentPage } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://64494ce6e7eb3378ca458a5d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}${currentPage}&limit=4`
        );

    return data;
});