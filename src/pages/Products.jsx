import styled from "styled-components";
import Hero from "../components/Hero";

const Products = () => {
  return (
    <Wrapper>
      <Hero page={"products"}></Hero>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
`;
export default Products;
