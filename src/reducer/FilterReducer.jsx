import {
  CHANGE_SORT,
  CHANGE_VIEW,
  CLEAR_FILTERS,
  FILTER,
  LOAD_PRODUCTS,
} from "../actions";

const reducer = (state, { type, payload, categories }) => {
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

  if (type === LOAD_PRODUCTS) {
    console.log("load PRODUCT");
    const maxPrice = payload.reduce((prev, acc) => {
      if (prev < acc.price) {
        return acc.price;
      }
      return prev;
    }, 0);
    return {
      ...state,
      all_products: payload,
      filtered_product: payload,
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice,
        categories: categories,
      },
    };
  }

  if (type === CHANGE_SORT) {
    const products = [...state.filtered_product];
    if (payload === "DESCENDING") {
      const newRes = products.sort((prev, curr) => {
        return curr.price - prev.price;
      });
      // console.log(newRes);
      return { ...state, filtered_product: newRes };
    }
    if (payload === "ASCENDING") {
      const newRes = products.sort((prev, curr) => {
        return prev.price - curr.price;
      });
      // console.log(newRes);
      return { ...state, filtered_product: newRes };
    }
    if (payload === "default") {
      return { ...state, filtered_product: products };
    }
    console.log(payload);
    return state;
  }

  // clear filters
  if (type === CLEAR_FILTERS) {
    return {
      ...state,
      filtered_product: payload,
      filters: {
        ...state.filters,
        text: "",
        categories: "all",
        colors: "all",
        brands: "all",
        price: state.filters.max_price,
      },
    };
  }

  // apply filters
  if (type === FILTER) {
    const { name, value, isChecked } = payload;
    const products = [...state.all_products];
    let tempSorted = [];
    if (name === "text") {
      const newProducts = products.filter((item) => {
        return item.name.startsWith(value);
      });
      tempSorted = {
        ...state,
        filtered_product: newProducts,
        filters: { ...state.filters, text: value },
      };
      return tempSorted;
    }
    if (name === "brands") {
      if (value === "all") {
        const newResult = {
          ...state,
          filtered_product: products,
          filters: { ...state.filters, brands: value },
        };
        tempSorted = newResult;
        return newResult;
      }
      const newProducts = products.filter((item) => item.company === value);
      const newResult = {
        ...state,
        filtered_product: newProducts,
        filters: { ...state.filters, brands: value },
      };
      tempSorted = newResult;
      return newResult;
    }
    if (name === "price") {
      let newProducts = tempSorted.filter((item) => item.price <= value);
      if (tempSorted.length === 0) {
        newProducts = products.filter((item) => item.price <= value);
      }
      return {
        ...state,
        filtered_product: newProducts,
        filters: { ...state.filters, price: value },
      };
    }

    if (name === "colors") {
      if (value === "all") {
        return {
          ...state,
          filtered_product: products,
          filters: { ...state.filters, colors: "all" },
        };
      }
      let newRes = products.filter((item) => {
        return item.colors.includes(value);
      });

      return {
        ...state,
        filtered_product: newRes,
        filters: { ...state.filters, colors: value },
      };
    }

    if (name === "categories") {
      console.log(value);
      // // console.log(state.filters.categories[value]);
      // console.log(state);
      // console.log(isChecked);
      const newRes = products.filter((product) => {
        // console.log(state.filters.categories);
        // console.log(product.category);
        console.log(state.filters.categories[product.category]);
        // console.log(product);
        return product.categories;
      });
      // console.log();

      // console.log(newRes);
      // console.log(products);
      return {
        ...state,
        filters: {
          ...state.filters,
          categories: {
            ...state.filters.categories,
            [value]: isChecked,
          },
        },
      };
      // return state;
    }
  }
  // return state;
  throw new Error(`no ${type} is specified`);
};

export default reducer;
