import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/ProductReducer";
import axios from "axios";
const ProductsProvider = createContext();
import { productsURL, singleProductURL } from "../helpers/helper";

import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCTS_BEGIN,
  GET_SINGLE_PRODUCTS_SUCCESS,
  GET_SINGLE_PRODUCTS_ERROR,
} from "../actions";
const ProductsContext = ({ children }) => {
  const initialState = {
    products_error: false,
    products_loading: false,
    featured_Products: [],
    products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = async () => {
    // dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const { data } = await axios.get(productsURL);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR });
      console.log(error);
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCTS_BEGIN });
    try {
      const { data } = await axios.get(`${singleProductURL}${id}`);
      dispatch({ type: GET_SINGLE_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCTS_ERROR });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ProductsProvider.Provider value={{ ...state, fetchSingleProduct }}>
      {children}
    </ProductsProvider.Provider>
  );
};

// custom hook
export const useProductsProvider = () => useContext(ProductsProvider);

export default ProductsContext;
