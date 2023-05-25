import { Link } from "react-router-dom";
import styled from "styled-components";

const Hero = ({ page, extra }) => {
  return (
    <Wrapper className="d-flex justify-content-center align-items-center">
      <Link to="home">Home / </Link>
      {extra && <Link to="products">Products / </Link>}
      {page}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: var(--clr-p-9);
  text-align: center;
  height: 5rem;
  margin: 3rem 0;
  color: var(--clr-p-1);
  a {
    /* transition: var(--transition); */
    color: var(--clr-p-6);
    :hover {
      color: var(--clr-p-3);
    }
  }
`;
export default Hero;
