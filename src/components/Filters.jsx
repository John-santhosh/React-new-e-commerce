import { ImSearch } from "react-icons/im";
import styled from "styled-components";

const Filters = () => {
  return (
    <Wrapper className="filters">
      <div className="search_bar">
        <input className="form-cotrol " type="text" />
        <button>
          <ImSearch />
        </button>
      </div>
      <h5 className="my-4">Category</h5>
      <h5 className="my-4">Brand</h5>
      <h5 className="my-4">Colors</h5>
      <h5>Price</h5>
      <span>{2000}</span>
      <input type="range" name="" id="" />
      <button className="">Clear Filters</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
`;
export default Filters;
