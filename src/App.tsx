import { useState } from "react";
import { useQuery } from "react-query";

import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { Wrapper, StyledButton } from "./App.styles";
import axios from "axios";
import { CartItemType } from "./types";
import Item from "./components/Items";
import Cart from "./components/Cart";

const getProducts = async (): Promise<CartItemType[]> => {
  return await (
    await axios({
      method: "GET",
      url: `https://fakestoreapi.com/products`,
    })
  ).data;
};
const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount, 0);
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // if item is in the cart
      const isItemInCart = prev.find(item => item.id === clickedItem.id);

      if(isItemInCart){
        return prev.map(item => item.id===clickedItem.id ? {...item, amount: item.amount+1} : item)
      }

      // First time the item is added
      return  [...prev, {...clickedItem, amount:1}]
    } )
  };
  const handleRemoveFromCart = (id: number) =>{
    setCartItems(prev => prev.reduce((acc, item)=> {
//       check if the current item has only one instance present in cart then remove it
        if(item.id===id){
          if(item.amount ===1) return acc;
          return [...acc, {...item, amount: item.amount-1}]
        }else{
          return [...acc,item]
        }
    },[] as CartItemType[]) )
  } ;

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went Wrong ...</div>;
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart}  />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Item item={item} handAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
