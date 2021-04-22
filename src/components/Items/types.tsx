import { CartItemType } from "../../types";

export type Props = {
    item:CartItemType;
    handAddToCart:(clickedItemType:CartItemType)=> void
}