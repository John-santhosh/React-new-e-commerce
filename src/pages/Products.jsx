import styled from "styled-components";
import Hero from "../components/Hero";
import { BsFillGridFill, BsGrid3X3GapFill, BsListUl } from "react-icons/bs";
import GridProducts from "../components/GridProducts";
const Products = () => {
  return (
    <Wrapper>
      <Hero page={"products"}></Hero>
      <div className="section-center">
        <div className="filters">filters</div>
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
              <button>
                <BsFillGridFill />
              </button>
              <button>
                <BsGrid3X3GapFill />
              </button>
              <button>
                <BsListUl />
              </button>
            </div>
          </div>
          <GridProducts></GridProducts>
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
  @media only screen and (max-width: 570px) {
  }
  .sorting,
  .price_sorting {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: red; */
  }
  .price_sorting {
    gap: 2rem;
  }
  .view {
    background-color: red;
    > * {
      margin: 0 1rem;
    }
  }
  p {
    margin: 0;
  }
`;
export default Products;
