import { CHANGE_VIEW, FILTER, LOAD_PRODUCTS } from "../actions";

const reducer = (state, { type, payload }) => {
  if (type === CHANGE_VIEW) {
    if (payload === "GRID") {
      return { ...state, gridView: true, gridView_2: false, listView: false };
    }
    if (payload === "GRID2") {
      return { ...state, gridView: false, gridView_2: true, listView: false };
    }
    if (payload === "LIST") {
      return { ...state, gridView: false, gridView_2: false, listView: true };
    }
  }
  //
  // if(type===''){}
  if (type === LOAD_PRODUCTS) {
    return { ...state, all_products: payload };
  }
  if (type === FILTER) {
    // if (payload === "ASCENDING") {
    //   const products = state?.all_products;
    //   const newRes = products.sort((prev, curr) => {
    //     console.log(curr);
    //     return curr.price - prev.price;
    //   });
    //   console.log(newRes);
    //   console.log(products);
    //   return state;
    // }
    return state;
  }
  return state;
  // throw new Error(`no ${action.type} is specified`);
};

export default reducer;
