import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import { CHANGE_VIEW, FILTER, LOAD_PRODUCTS } from "../actions";
import { useProductsProvider } from "./ProductsContext";
const FilterProvider = createContext();

const FilterContext = ({ children }) => {
  const { products } = useProductsProvider();
  const initialState = {
    all_Products: products,
    gridView: true,
    gridView_2: false,
    listView: false,
    max_price: 13429,
    min_price: 0,
    filtered_product: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, []);
  const changeView = (view) => {
    dispatch({ type: CHANGE_VIEW, payload: view });
  };

  const filterProducts = (filter) => {
    // console.log(filter);
    dispatch({ type: FILTER, payload: filter });
  };

  return (
    <FilterProvider.Provider value={{ ...state, changeView, filterProducts }}>
      {children}
    </FilterProvider.Provider>
  );
};

// custom hook
export const useFilterContext = () => useContext(FilterProvider);

export default FilterContext;
