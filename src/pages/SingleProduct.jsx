import { Link, useParams } from "react-router-dom";
import { useProductsProvider } from "../context/ProductsContext";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsFillHeartFill,
} from "react-icons/bs";
import { ImCheckmark } from "react-icons/im";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { singleProductSocials } from "../data";
import { useCartContext } from "../context/CartContext";
import { toast } from "react-toastify";

const SingleProduct = () => {
  const [count, setCount] = useState(1);
  const { addItem } = useCartContext();
  const { id } = useParams();
  const {
    fetchSingleProduct,
    single_product_loading,
    single_product_error,
    single_product,
  } = useProductsProvider();

  const productAdded = () => {
    toast.success("Added To Cart");
  };
  const productLimited = () => {
    toast.error("max_Limit reached");
  };
  if (single_product_error) {
    return (
      <Wrapper>
        <div className="error mt-5">
          <h2>Item not found</h2>
          <Link className="btn btn-solid" to="/products">
            Back To Collections
          </Link>
        </div>
      </Wrapper>
    );
  }

  useEffect(() => {
    fetchSingleProduct(id);
  }, [id]);
  const { name, images, price, stars, description, colors, category, stock } =
    single_product;
  const [mainImg, setMainImg] = useState(images?.[0]?.url);
  const [mainColor, setMainColor] = useState(colors?.[0]);
  useEffect(() => {
    setMainImg(images?.[0]?.url);
    setMainColor(colors?.[0]);
  }, [images]);

  return (
    <Wrapper>
      <Hero page={name} extra></Hero>
      <div className="section-center">
        {single_product_loading ? (
          <div className="custom-loader"></div>
        ) : (
          <>
            <div className="img-container mb-5">
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
              <div className="stars">{stars}</div>
              <p>{description}</p>
              <hr />
              <div className="colors">
                <p>Colors :</p>
                {colors?.map((color, i) => {
                  return (
                    <span
                      onClick={() => setMainColor(color)}
                      className={mainColor == color ? "active" : ""}
                      key={i}
                      style={{ background: color }}
                    >
                      {mainColor === color ? <ImCheckmark /> : null}
                    </span>
                  );
                })}
              </div>
              <div className="add_cart">
                <div className="btns d-flex align-items-center">
                  <button>
                    <IoMdArrowDropup
                      onClick={() => {
                        setCount((prev) => {
                          if (prev >= stock) {
                            productLimited();
                            return prev;
                          }
                          return prev + 1;
                        });
                      }}
                    />
                  </button>
                  <p>{count}</p>
                  <button>
                    <IoMdArrowDropdown
                      onClick={() => {
                        setCount((prev) => {
                          if (prev <= 1) {
                            return 1;
                          }
                          return prev - 1;
                        });
                      }}
                    />
                  </button>
                </div>
                {stock <= 0 ? (
                  <button className="btn btn-solid">OUT OF STOCK</button>
                ) : (
                  <button
                    className="btn btn-solid"
                    onClick={() => {
                      addItem(
                        {
                          ...single_product,
                          amount: count,
                          color: mainColor,
                          id: `${id + mainColor}`,
                        },
                        productLimited,
                        productAdded
                      );
                    }}
                  >
                    ADD TO CART
                  </button>
                )}
                <BsFillHeartFill />
              </div>
              <p className="my-4 fw-semibold">
                {" "}
                category : <span className="fw-normal">{category}</span>
              </p>

              <div className="socials d-flex mb-5">
                {singleProductSocials.map(({ Icon, id, url }) => {
                  return (
                    <a href={url} key={id}>
                      <Icon></Icon>
                    </a>
                  );
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
  .socials {
    gap: 2rem;
    a {
      cursor: pointer;
      :hover {
        color: green;
      }
    }
  }
  .add_cart {
    display: flex;
    align-items: stretch;
    gap: 1rem;
    height: 50px;
    .btns {
      gap: 1rem;
      border: 1px solid var(--clr-p-8);
      button {
        svg {
          font-size: 2rem;
        }
      }
    }
    > svg {
      font-size: 1.3rem;
      margin-left: 1rem;
      cursor: pointer;
      transition: var(--transition);
      align-self: center;
      :hover {
        color: red;
        filter: drop-shadow(0 0 2px var(--clr-p-1));
      }
    }
  }
  .colors {
    display: flex;
    margin: 2rem 0;
    gap: 1rem;
    span {
      cursor: pointer;
      opacity: 0.5;
      display: block;
      width: 26px;
      border: 2px solid var(--clr-p-1);
      padding: 1px;
      background-clip: content-box !important;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        color: var(--clr-p-11);
      }
    }
    .active {
      opacity: 1;
    }
  }
  .stars {
    margin: 1.3rem 0;
    ~ p {
      margin-bottom: 1.3rem;
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
    /* height: 500px; */
    > img {
      max-height: 600px;
    }
    .sub-images {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 0.5rem;
      > img {
        height: 60px;
      }
    }
  }
  @media only screen and (max-width: 768px) {
    > div {
      grid-template-columns: unset;
    }
    .img-container {
      height: auto;
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
