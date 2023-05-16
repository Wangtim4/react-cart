import { useContext } from 'react';
import productsData from '../assets/productsData';
import { CartContext } from "../store";

export default function Products() {
  const [state, dispatch] = useContext(CartContext);
  return (
    <div className="row  row-cols-3 g-3">
      {productsData.map((product) => {
        return (<div className="col" key={product.id}>
          <div className="card" >
            <img src={product.img} className="card-img-top" alt={product.title} />
            <div className="card-body">
              <h6 className="card-title">
                {product.title}
                <span className="float-end">NT$ {product.price}</span>
              </h6>
              <button className="btn btn-outline-primary w-100" type="button" 
              onClick={()=> {
                dispatch({
                  type: 'ADD_CART',
                  payload: {
                    ...product,
                    quantity: 1,
                  }
                })            
              }}>加入購物車</button>
            </div>
          </div>
        </div>)
      })}

    </div>
  )
}