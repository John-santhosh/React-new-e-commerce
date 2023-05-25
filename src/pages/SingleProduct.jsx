import { Link, useParams } from "react-router-dom";
import { useProductsProvider } from "../context/ProductsContext";
import { useEffect } from "react";
import styled from "styled-components";
import Hero from "../components/Hero";

const SingleProduct = () => {
  const { id } = useParams();
  const {
    fetchSingleProduct,
    single_product_loading,
    single_product_error,
    single_product,
  } = useProductsProvider();

  useEffect(() => {
    fetchSingleProduct(id);
  }, []);
  if (single_product_error) {
    return (
      <Wrapper>
        <div className="error">
          <h2>Item not found</h2>
          <Link className="btn btn-solid" to="/products">
            Back To Collections
          </Link>
        </div>
      </Wrapper>
    );
  }
  const { name } = single_product;
  return (
    <Wrapper>
      <Hero page={name} extra></Hero>
      SingleProduct: {id}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .error {
    display: grid;
    place-items: center;
    text-align: center;
  }
`;
export default SingleProduct;
