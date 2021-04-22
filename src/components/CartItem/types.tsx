import { CartItemType } from "../../types";

export type Props = {
    item: CartItemType;
    addToCart:(clickedItem: CartItemType )=> void;
    removeFromCart:(id:number)=> void;   
}