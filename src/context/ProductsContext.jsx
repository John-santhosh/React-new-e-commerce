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
  LIKE,
  UNLIKE,
  CLEAR_WISHLIST,
} from "../actions";
import Airtable from "airtable";

const airTable = new Airtable({ apiKey: import.meta.env.VITE_TABLE_KEY }).base(
  "appIG2HRBqmIWjjXg"
);
const ProductsContext = ({ children }) => {
  const initialState = {
    products_error: false,
    products_loading: false,
    featured_Products: [],
    products: [],
    single_product_loading: false,
    single_product_error: false,
    single_product: {},
    wishlisted: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchProducts = () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    // console.log("products begin");
    airTable("data")
      .select({
        view: "Grid view",
      })
      .eachPage(
        (records, fetchNextPage) => {
          const products = records.map((record) => {
            return {
              ...record.fields,
              image: record.fields.images[0].url,
              id: record.id,
              wishlisted: false,
            };
          });
          dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            dispatch({ type: GET_PRODUCTS_ERROR });
            return;
          }
        }
      );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchSingleProduct = (id) => {
    dispatch({ type: GET_SINGLE_PRODUCTS_BEGIN });
    airTable("data").find(id, function (err, record) {
      if (err) {
        console.error(err);
        dispatch({ type: GET_SINGLE_PRODUCTS_ERROR });
        return;
      }

      dispatch({
        type: GET_SINGLE_PRODUCTS_SUCCESS,
        payload: { ...record.fields, id: record.id },
      });
    });
  };

  //
  const likeProduct = (id) => {
    dispatch({ type: LIKE, payload: id });
  };

  //
  const removeLike = (id) => {
    dispatch({ type: UNLIKE, payload: id });
  };

  // clear Wishlist

  const clearWishlist = () => {
    dispatch({ type: CLEAR_WISHLIST });
  };
  return (
    <ProductsProvider.Provider
      value={{
        ...state,
        fetchSingleProduct,
        likeProduct,
        removeLike,
        clearWishlist,
      }}
    >
      {children}
    </ProductsProvider.Provider>
  );
};

// custom hook
export const useProductsProvider = () => useContext(ProductsProvider);

export default ProductsContext;
