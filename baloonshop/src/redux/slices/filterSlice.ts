import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
}

export type Sort = {
    name: string;
    sortProperty: SortPropertyEnum;
}

export interface FitersSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}

const initialState: FitersSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности ⬆',
        sortProperty: SortPropertyEnum.PRICE_DESC,
    }
};

export const filterSlice =  createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FitersSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности ⬆',
                    sortProperty: SortPropertyEnum.RATING_DESC,
                }
            }
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
    },
}); 

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilters = (state: RootState) => state.filter;
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;