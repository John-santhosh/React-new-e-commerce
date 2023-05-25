import { Link, useParams } from "react-router-dom";
import { useProductsProvider } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

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

  console.log(single_product);

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

  // if (single_product_loading) {
  //   console.log("loading");
  //   return (
  //     <Wrapper>
  //       <div className="custom-loader"></div>
  //     </Wrapper>
  //   );
  // }
  // console.log("loading comp");

  // console.log("loading comp");

  // console.log(single_product);

  const { name, images, price, stars, description, colors } = single_product;
  const [mainImg, setMainImg] = useState(images[0]?.url);
  return (
    <Wrapper>
      <Hero page={name} extra></Hero>
      <div className="section-center">
        {single_product_loading ? (
          <div className="custom-loader"></div>
        ) : (
          <>
            <div className="img-container">
              <img src={mainImg} alt="main-img" />
              <div className="sub-images">
                {images?.map(({ id, url }) => {
                  return <img key={id} src={url} alt="sub images" />;
                })}
              </div>
            </div>
            <div className="product_description">
              <h3 className="title">{name}</h3>
              <p className="price"> &#x20B9; {price}</p>
              <div>{stars}</div>
              <p>{description}</p>
              <hr />
              <div className="colors">
                {colors?.map((color, i) => {
                  return <span key={i} style={{ background: color }}></span>;
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors {
    display: flex;
    span {
      display: block;
      width: 25px;
      height: 25px;
      border-radius: 50%;
    }
  }
  min-height: 100vh;
  > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  .img-container {
    display: grid;
    gap: 2rem;
    .sub-images {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }
  }
  .product_description {
    .h3 {
      font-weight: 500;
    }
    .price {
      font-size: 1.3rem;
      color: red;
    }
  }
  .error {
    display: grid;
    place-items: center;
    text-align: center;
  }

  /* custom loader */
  .custom-loader {
    margin: 4rem auto;
  }
  .custom-loader {
    width: 160px;
    height: calc(160px * 0.866);
    clip-path: polygon(50% 0, 100% 100%, 0 100%);
    color: #766df4;
    background: linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0), linear-gradient(currentColor 0 0),
      linear-gradient(currentColor 0 0), linear-gradient(currentColor 0 0);
    background-size: 100% calc(100% / 5 + 2px);
    background-repeat: no-repeat;
    animation: p5 2s infinite;
  }
  @keyframes p5 {
    0% {
      background-position: 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4),
        0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4);
    }
    20% {
      background-position: 0 calc(4 * 100% / 4), 0 calc(-2 * 100% / 4),
        0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4);
    }
    40% {
      background-position: 0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4),
        0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4);
    }
    60% {
      background-position: 0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4),
        0 calc(2 * 100% / 4), 0 calc(-2 * 100% / 4), 0 calc(-2 * 100% / 4);
    }
    80% {
      background-position: 0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4),
        0 calc(2 * 100% / 4), 0 calc(1 * 100% / 4), 0 calc(-2 * 100% / 4);
    }
    100% {
      background-position: 0 calc(4 * 100% / 4), 0 calc(3 * 100% / 4),
        0 calc(2 * 100% / 4), 0 calc(1 * 100% / 4), 0 calc(0 * 100% / 4);
    }
  }
`;
export default SingleProduct;
