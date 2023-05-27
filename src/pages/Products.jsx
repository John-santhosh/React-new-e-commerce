import styled from "styled-components";
import Hero from "../components/Hero";
import { BsFillGridFill, BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import GridProducts from "../components/GridProducts";
import GridProducts2 from "../components/GridProducts2";
import ListProducts from "../components/ListProducts";
import { useFilterContext } from "../context/FilterContext";
import { viewToggleButtons } from "../data";
import { ImSearch } from "react-icons/im";
import Filters from "../components/Filters";
const Products = () => {
  const { gridView, gridView_2, listView, changeView } = useFilterContext();
  return (
    <Wrapper>
      <Hero page={"products"}></Hero>
      <div className="section-center">
        <Filters></Filters>
        <div className="products">
          <div className="sorting">
            <div className="price_sorting d-flex">
              <select name="sort" id="sort">
                <option value="default">None</option>
                <option value="ascending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
              <p>
                showing {15} of {22} results
              </p>
            </div>
            <div className="view">
              {viewToggleButtons.map((item) => {
                return (
                  <button onClick={() => changeView(item.view)} key={item.id}>
                    <item.Icon />
                  </button>
                );
              })}
            </div>
          </div>
          {gridView && <GridProducts></GridProducts>}
          {gridView_2 && <GridProducts2></GridProducts2>}
          {listView && <ListProducts></ListProducts>}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .section-center {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
  }
  @media only screen and (max-width: 992px) {
    .section-center {
      grid-template-columns: unset;
    }
  }

  .sorting,
  .price_sorting {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .price_sorting {
    gap: 2rem;
  }
  .sorting {
    margin-bottom: 2rem;
  }
  p {
    margin: 0;
  }
  @media only screen and (max-width: 570px) {
    .sorting,
    .price_sorting {
      flex-direction: column;
      align-items: stretch;
    }
    .price_sorting {
      gap: 0;
    }
    p {
      margin: 1rem 0;
    }
  }
  svg {
    color: var(--clr-p-4);
    font-size: 1.2rem;
  }
  .view {
    > button:nth-child(2) {
      margin: 0 1.2rem;
    }
  }
`;
export default Products;
