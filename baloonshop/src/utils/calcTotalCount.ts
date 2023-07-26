import { CartItem } from "../redux/cart/types";

export const calcTotalCount = (items: CartItem[]) => {
 return  items.reduce((sum, obj) => obj.count + sum, 0);
};
