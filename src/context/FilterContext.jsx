import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import { CHANGE_VIEW } from "../actions";
import { useProductsProvider } from "./ProductsContext";
const FilterProvider = createContext();

const FilterContext = ({ children }) => {
  const { products } = useProductsProvider();
  const initialState = {
    allProducts: [],
    gridView: true,
    gridView_2: false,
    listView: false,
    ascending: [],
    descending: [],
    category: [],
    brands: [],
    colors: [],
    max_price: 13429,
    min_price: 0,
    all_products: products,
    filtered_product: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const changeView = (view) => {
    dispatch({ type: CHANGE_VIEW, payload: view });
  };
  return (
    <FilterProvider.Provider value={{ ...state, changeView }}>
      {children}
    </FilterProvider.Provider>
  );
};

// custom hook
export const useFilterContext = () => useContext(FilterProvider);

export default FilterContext;
