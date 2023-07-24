import { RootState } from "../../store";

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilters = (state: RootState) => state.filter;