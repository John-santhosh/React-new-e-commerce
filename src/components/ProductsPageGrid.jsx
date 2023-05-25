import styled from "styled-components";
import { useProductsProvider } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiFillEye } from "react-icons/ai";
const ProductsPageGrid = () => {
  const { featured_Products, products_loading, products_error } =
    useProductsProvider();
  if (products_error) {
    return <div>There was an error Loading</div>;
  }
  return (
    <Wrapper className="products">
      {products_loading ? (
        <div className="custom-loader"></div>
      ) : (
        featured_Products?.map((product) => {
          // console.log(product);
          const { name, image, id, price } = product;
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
                  <button className="btn">
                    <AiOutlineHeart />
                  </button>
                  <Link to={`/products/${id}`}>Buy Now</Link>
                  <button className="btn">
                    <AiFillEye />
                  </button>
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
  place-items: center;
  justify-items: stretch;
  text-align: center;

  @media only screen and (min-width: 1350px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 500px) {
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
export default ProductsPageGrid;
