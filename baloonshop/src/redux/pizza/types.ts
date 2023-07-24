export type SearchPizzaParams = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'complited',
    ERROR = 'error,'
}

export type Pizza = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    types: number[];
    sizes: number[];
    rating: string;
}

export interface PizzaSliceState {
     items: Pizza[];
     status: Status;
}