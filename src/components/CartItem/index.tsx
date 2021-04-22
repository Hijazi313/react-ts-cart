import { Button } from "@material-ui/core";
import { Wrapper } from "./CartItem.styles";
import { Props } from "./types";

const CartItem: React.FC<Props> = ({item, addToCart, removeFromCart})=>{
    return <Wrapper>
    <div >
    <h3>{item.title}</h3>
    <div className="information">
        <p>Price : ${item.price} </p>
        <p>Total : ${(item.amount * item.price).toFixed(2) } </p>
    </div>

    <div className="buttons">
        <Button size="small" disableElevation variant="contained" onClick={()=>removeFromCart(item.id)} >
    -
        </Button>
        <Button size="small" disableElevation variant="contained" onClick={()=>addToCart(item)} >
    +
        </Button>
    </div>
    </div>
    <img src={item.image} alt={item.title}/>
    </Wrapper>
}
export default CartItem;