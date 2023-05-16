import React from 'react'; 
import { useReducer } from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Product";
import Cart from "./components/Cart";
import { CartContext } from "./store.js";

function App() {

  const cartReducer = useReducer((state, action) => {
    const cartList = [...state.cartList];
    // 1.取得當前目標品項的索引
    const index = cartList.findIndex((item) =>
      item.id === action.payload.id
    );
    const total = calculateTotal(cartList);
    console.log(total);
    // console.log(index);
    // console.log(action);
    switch (action.type) {
      case 'ADD_CART':
        if (index === -1) {
          // 還未加入購物車
          cartList.push(action.payload);
        } else {
          cartList[index].quantity += action.payload.quantity;
        }
        // // 小計金額
        // const array = cartList.map((item) => {
        //   return item.quantity * item.price;
        // });
        // // console.log(array);
        // const total = array.reduce((a, b) => {
        //   return a+b ;
        // },0)
        
        // 縮寫
        
        
        return {
          ...state,
          cartList,
          total: calculateTotal(cartList),
        };
      case 'CHANGR_CART_QUANTITY':
        cartList[index].quantity = action.payload.quantity;
        return {
          ...state,
          cartList,
          total: calculateTotal(cartList),
        };
        
      case 'REMOVE_CART_ITEM':
        cartList.splice(index, 1); 
        return {
          ...state,
          cartList,
        };
      default:
        return state;
    }
  }, {
    cartList: [],
  })

  return (
    <CartContext.Provider value={cartReducer}>
      <Navbar></Navbar>
      <div className="container mt-4">
        {/* 外層格線 */}
        <div className="row">
          <div className="col-md-7">
            {/* 內層格線 */}
            <Products></Products>
          </div>
          <div className="col-md-5">
            <Cart></Cart>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}

function calculateTotal(cartList) {
  return cartList.map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}

export default App;

