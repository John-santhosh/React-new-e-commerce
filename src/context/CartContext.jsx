import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/CartReducer";
import {
  ADD_CART_ITEM,
  TOGGLE_AMT,
  REMOVE_FROM_CART,
  CLEAR_CART,
  GET_TOTAL,
} from "../actions";
const CartProvider = createContext();

const CartContext = ({ children }) => {
  const initialState = {
    cart: [],
    wishList: [],
    total_Amount: 0,
    total_Price: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: GET_TOTAL });
  }, [state.cart]);

  // add item
  const addItem = (item) => {
    dispatch({ type: ADD_CART_ITEM, payload: item });
  };

  //remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  // count
  const ToggleCount = ({ id, act }) => {
    dispatch({ type: TOGGLE_AMT, payload: { id, act } });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // count totalAmount
  const totalAmount = () => {
    dispatch({ type: GET_TOTAL });
  };

  return (
    <CartProvider.Provider
      value={{ ...state, addItem, removeItem, ToggleCount, clearCart }}
    >
      {children}
    </CartProvider.Provider>
  );
};

// custom hook
export const useCartContext = () => useContext(CartProvider);

export default CartContext;
