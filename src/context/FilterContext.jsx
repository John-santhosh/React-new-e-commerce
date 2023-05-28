import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/FilterReducer";
import {
  CHANGE_SORT,
  CHANGE_VIEW,
  CLEAR_FILTERS,
  FILTER,
  LOAD_PRODUCTS,
} from "../actions";
import { useProductsProvider } from "./ProductsContext";
import getUniqueValues from "../utils/getUniqueValues";
const FilterProvider = createContext();

const FilterContext = ({ children }) => {
  const { products } = useProductsProvider();
  const initialState = {
    all_products: [],
    gridView: true,
    gridView_2: false,
    listView: false,
    filtered_product: [],
    filters: {
      text: "",
      categories: {},
      colors: "all",
      brands: "all",
      max_price: 0,
      min_price: 0,
      price: 0,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const categories = getUniqueValues(products, "category");
    const categories_state = categories.reduce(
      (prev, curr) => {
        return { ...prev, [curr]: false };
      },
      { all: false }
    );
    dispatch({
      type: LOAD_PRODUCTS,
      payload: products,
      categories: categories_state,
    });
  }, [products]);

  const changeView = (view) => {
    dispatch({ type: CHANGE_VIEW, payload: view });
  };

  const changeSort = (filter) => {
    // console.log(filter);
    dispatch({ type: CHANGE_SORT, payload: filter });
  };

  const updateFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let isChecked;
    if (name === "colors") {
      value = e.target.dataset.color;
    }
    if (name === "categories") {
      value = e.target.value;
      isChecked = e.target.checked;
    }
    dispatch({ type: FILTER, payload: { name, value, isChecked } });
  };

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTERS, payload: products });
  };
  return (
    <FilterProvider.Provider
      value={{ ...state, changeView, changeSort, updateFilter, clearFilter }}
    >
      {children}
    </FilterProvider.Provider>
  );
};

// custom hook
export const useFilterContext = () => useContext(FilterProvider);

export default FilterContext;
