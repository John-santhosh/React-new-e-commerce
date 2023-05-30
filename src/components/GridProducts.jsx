import styled from "styled-components";
import { useProductsProvider } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillEye, AiTwotoneHeart } from "react-icons/ai";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import image from "../assets/userpic.jpg";
const GridProducts = ({ products }) => {
  const { products_loading, likeProduct } = useProductsProvider();
  // const {fetchSingleProduct} = useProductsProvider()
  //
  // const [mainImg, setMainImg] = useState(0);

  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <Wrapper className="products">
      {products_loading ? (
        <div className="custom-loader"></div>
      ) : (
        products?.map((product) => {
          // console.log(product);
          const { name, image, id, price, wishlisted } = product;
          return (
            <div
              key={id}
              onMouseEnter={(e) => {
                e.currentTarget.querySelector("div.info").classList.add("show");
              }}
              onMouseLeave={(e) => {
                e.currentTarget
                  .querySelector("div.info")
                  .classList.remove("show");
              }}
              className="product"
            >
              <div className="image-container">
                <Link to={`/products/${id}`}>
                  <img src={image} alt={name} />
                </Link>
                <div className="info">
                  <button className="btn" onClick={() => likeProduct(id)}>
                    {wishlisted ? (
                      <AiTwotoneHeart className="liked" />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </button>
                  <Link to={`/products/${id}`}>Buy Now</Link>
                  {/* modal */}
                  <button
                    className="btn modal-btn"
                    onClick={() => handleShow("xxl-down")}
                  >
                    <AiFillEye />
                  </button>

                  <Modal
                    className="modal"
                    show={show}
                    fullscreen={true}
                    onHide={() => setShow(false)}
                  >
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                      {/* <div className="img-container mb-5">
                        <img src={images?.[mainImg]?.url} alt="main-img" />
                        <div className="sub-images">
                          {images?.map(({ id, url }, ind) => {
                            return (
                              <img
                                className={mainImg === ind ? "activeImg" : null}
                                onClick={() => {
                                  setMainImg(ind);
                                }}
                                key={id}
                                src={url}
                                alt="sub images"
                              />
                            );
                          })}
                        </div>
                      </div> */}
                      <h2 className="text-center mb-5">Quick view</h2>
                      <div className="quickView container d-flex align-items-center flex-wrap justify-content-center ">
                        <img className="col-lg-6 mb-5" src={image} alt="" />
                        <div className="col-lg-6 text-center">
                          <h2>show case of a single </h2>
                          <h3>Will be added soon</h3>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {/* modal end */}
                </div>
              </div>
              <h5>{name}</h5>
              <p className="price"> &#x20B9; {price}</p>
            </div>
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  min-height: 250px;
  text-align: center;

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 570px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .custom-loader {
    place-self: center;
    grid-column: 1/4;
  }

  .image-container {
    position: relative;
    /* aspect-ratio: 1/1; */
    height: 250px;
    overflow: hidden;
    width: 100%;
    margin-bottom: 1rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    > div {
      bottom: -3rem;
      position: absolute;
      z-index: 99;
      width: 100%;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      transition: var(--transition);
      > * {
        transition: var(--transition);
        background-color: var(--clr-p-3);
        :hover {
          background-color: var(--clr-p-5);
          color: #fff;
        }
      }
      button {
        border: none;
      }
      a {
        flex: 1;
        padding: 10px;
        border-right: 1px solid #fff;
        border-left: 1px solid #fff;
      }
      svg {
        color: #fff;
      }
    }
    .show {
      bottom: 0;
    }
    img {
      height: 250px;
    }
  }
  .btn .liked {
    filter: drop-shadow(0 0 10px red);
    color: red;
  }

  /* loader */
  .custom-loader {
    width: 80px;
    height: 80px;
    display: grid;
    color: var(--clr-p-3);
    -webkit-mask: radial-gradient(circle 5px, #0000 90%, #000);
    animation: sh3 1.5s infinite linear;
  }
  .custom-loader:before,
  .custom-loader:after {
    content: "";
    grid-area: 1/1;
    background: radial-gradient(
          farthest-side at bottom left,
          currentColor 94%,
          #0000
        )
        top left,
      radial-gradient(farthest-side at top right, currentColor 94%, #0000)
        bottom right;
    background-size: 63% 50%;
    background-repeat: no-repeat;
    -webkit-mask: radial-gradient(65% 110% at bottom left, #0000 94%, #000) top
        left,
      radial-gradient(65% 110% at top right, #0000 94%, #000) bottom right;
    -webkit-mask-size: 62% 50%;
    -webkit-mask-repeat: no-repeat;
  }
  .custom-loader:after {
    transform: rotate(90deg);
  }

  @keyframes sh3 {
    100% {
      transform: rotate(1turn);
    }
  }
`;
export default GridProducts;
