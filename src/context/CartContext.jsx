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
    total_Amount: 0,
    total_Price: 0,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: GET_TOTAL });
  }, [state.cart]);

  // add item
  const addItem = (item, productLimited, productAdded) => {
    dispatch({
      type: ADD_CART_ITEM,
      payload: item,
      functions: { productLimited, productAdded },
    });
  };

  //remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: id });
  };

  // count
  const ToggleCount = ({ id, act }, productLimited) => {
    dispatch({
      type: TOGGLE_AMT,
      payload: { id, act },
      functions: { productLimited },
    });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
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
