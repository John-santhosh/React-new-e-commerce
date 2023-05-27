import {
  ADD_CART_ITEM,
  CLEAR_CART,
  GET_TOTAL,
  REMOVE_FROM_CART,
  TOGGLE_AMT,
} from "../actions";
const reducer = (state, { type, payload }) => {
  // console.log(type);
  if (type === ADD_CART_ITEM) {
    console.log(state);
    const isProductExist = state.cart.some((item) => item.id === payload.id);

    if (isProductExist) {
      const newProducts = state.cart.map((item) => {
        if (item.id === payload.id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: newProducts };
    }
    return { ...state, cart: [...state.cart, payload] };
  }

  if (type === TOGGLE_AMT) {
    const { id, act } = payload;
    if (act === "DEC") {
      const newItems = state.cart.map((item) => {
        if (item.id === id) {
          if (item.amount <= 1) {
            return { ...item, amount: 1 };
          }
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      });
      return { ...state, cart: newItems };
    }
    if (act === "INC") {
      const newItems = state.cart.map((item) => {
        if (item.id === id) {
          if (item.amount >= item.stock) {
            return { ...item, amount: item.stock };
          }
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      return { ...state, cart: newItems };
    }
  }
  if (type === REMOVE_FROM_CART) {
    // console.log(state);
    const newCart = state.cart.filter((item) => item.id !== payload);
    return { ...state, cart: newCart };
  }

  if (type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (type === GET_TOTAL) {
    console.log(state);
    const total = state.cart.reduce((curr, prev) => {
      console.log(prev);
      return curr.amount + prev;
    }, 0);
    console.log(total);
    return state;
  }
  // return state;
  throw new Error(`no ${type} is specified`);
};

export default reducer;
