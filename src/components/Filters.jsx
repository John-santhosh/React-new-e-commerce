import { ImCheckmark, ImSearch } from "react-icons/im";
import styled from "styled-components";
import getUniqueValues from "../utils/getUniqueValues";
import { useFilterContext } from "../context/FilterContext";
const Filters = () => {
  const {
    filters: {
      max_price,
      min_price,
      price,
      text,
      brands: brand,
      colors: currColor,
      categories: all_Category,
    },
    all_products,
    updateFilter,
    clearFilter,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const colors = getUniqueValues(all_products, "colors");
  const brands = getUniqueValues(all_products, "company");

  return (
    <Wrapper className="filters">
      <form className="search_bar" onSubmit={(e) => e.preventDefault()}>
        <input
          name="text"
          onChange={updateFilter}
          className="form-cotrol"
          type="text"
          value={text}
        />
        <button>
          <ImSearch />
        </button>
      </form>

      <div className="my-4 categories">
        <h4>Category</h4>
        <div>
          <input
            className="me-3"
            type="checkbox"
            name="categories"
            value="all"
            checked={all_Category["all"]}
            onChange={updateFilter}
            // onClick={() => {
            //   setAll_Category({ ...all_Category, all: !all_Category["all"] });
            // }}
          />
          All
        </div>
        {categories.map((category, ind) => {
          return (
            <div key={ind}>
              <input
                className="me-3"
                type="checkbox"
                name="categories"
                value={category}
                checked={all_Category[category]}
                onChange={updateFilter}
                // onClick={() =>
                //   // setAll_Category({
                //   //   ...all_Category,
                //   //   [category]: !all_Category[category],
                //   // })
                // }
              />
              {category}
            </div>
          );
        })}
      </div>
      <div className="my-4 colors ">
        <h4>colors</h4>
        <div className="d-flex">
          <button
            className={currColor === "all" ? "active" : ""}
            onClick={updateFilter}
            data-color="all"
            name="colors"
          >
            All
          </button>
          {colors.map((color, ind) => {
            return (
              <button
                onClick={updateFilter}
                data-color={color}
                name="colors"
                className={currColor === color ? "active" : ""}
                key={ind}
                style={{ background: color }}
              >
                {currColor === color ? <ImCheckmark /> : null}
              </button>
            );
          })}
        </div>
      </div>
      <div className="my-4 brands">
        <h4>Brand</h4>
        <select onChange={updateFilter} name="brands" id="" value={brand}>
          <option value="all">All</option>
          {brands.map((brand, ind) => {
            return (
              <option key={ind} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
      <h5>Price</h5>
      <p>{price}</p>
      <input
        type="range"
        name="price"
        id=""
        value={price}
        min={min_price}
        max={max_price}
        onChange={updateFilter}
      />
      <div className="my-4">
        <button className="btn btn-solid" onClick={clearFilter}>
          Clear Filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-transform: capitalize;
  height: max-content;
  position: sticky;
  top: 5rem;
  .search_bar {
    border-radius: 10px;
    padding: 0.5rem 0;
    display: flex;
    border: 1px solid var(--clr-p-8);
    width: 280px;
    gap: 10px;
    input {
      border: none;
      outline: none;
      border-right: 2px solid var(--clr-p-8);
      padding: 0 1rem;
    }
    button {
    }
    > * {
      height: 100%;
    }
  }

  .colors {
    div {
      gap: 0.5rem;
    }
    button:not(button:first-child) {
      height: 25px;
      border-radius: 50%;
      cursor: pointer;
      width: 25px;
      border: 1px solid var(--clr-p-1);
      padding: 2px;
      background-clip: content-box !important;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .active {
      svg {
        color: #62628f;
        font-size: 0.8rem;
      }
    }
  }
  .brands * {
    text-transform: capitalize;
  }
`;
export default Filters;
