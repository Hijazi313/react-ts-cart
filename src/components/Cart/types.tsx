import { CartItemType } from "../../types";

export type Props = {
    cartItems: CartItemType[];
    addToCart:(clickedItem: CartItemType) => void;
    removeFromCart:(id:number)=> void
} 