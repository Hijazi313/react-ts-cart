import { Button } from "@material-ui/core";
import { Wrapper } from "./Items.styles";
import { Props } from "./types";

const Item: React.FC<Props> = ({item, handAddToCart})=>(
    <Wrapper>
        <img src={item.image} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}s</p>
        </div>
        <Button onClick={()=>handAddToCart(item)} > Add To Cart</Button>
    </Wrapper>
)

export default Item;