import styled from "styled-components";
import { useProductsProvider } from "../context/ProductsContext";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
const ListProducts = () => {
  const { products_error, products_loading, products } = useProductsProvider();
  if (products_error) {
    return <div>There was an error Loading</div>;
  }
  return (
    <Wrapper className="products">
      {products_loading ? (
        <div className="custom-loader"></div>
      ) : (
        products?.map((product) => {
          const { name, image, id, price, description } = product;
          return (
            <div key={id} className="product">
              <div className="image-container">
                <Link to={`/products/${id}`}>
                  <img src={image} alt={name} />
                </Link>
              </div>
              <div>
                <h5>{name}</h5>
                <p className="price"> &#x20B9; {price}</p>
                <div className="stars">{4.5}</div>
                <p>{description}</p>
                <div className="info">
                  <button className="btn-hover color-8">
                    <Link className="" to={`/products/${id}`}>
                      Buy Now
                    </Link>
                  </button>
                  <button className="">
                    <AiTwotoneHeart />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(1, 1fr);
  min-height: 250px;
  place-items: center;
  justify-items: stretch;

  .product {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    h5 {
      color: var(--clr-p-1);
      font-size: 1.8rem;
    }
    .price {
      color: red;
      font-size: 1.2rem;
    }
    .stars {
      margin: 1rem 0;
    }
    p {
      line-height: 1.7;
    }
    a:hover {
      color: inherit;
    }

    svg {
      font-size: 1.5rem;
      transition: var(--transition);
      :hover {
        color: red;

        filter: drop-shadow(0 0 10px red);
      }
    }
  }
  @media only screen and (max-width: 650px) {
    .product {
      grid-template-columns: unset;
    }
  }
  .custom-loader {
    place-self: center;
    grid-column: 1/4;
  }

  .image-container {
    position: relative;
    /* min-height: 250px; */
    overflow: hidden;
    width: 100%;
    margin-bottom: 1rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

  /* button animation */
  .btn-hover {
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    height: 55px;
    text-align: center;
    border: none;
    background-size: 300% 100%;

    border-radius: 10px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .btn-hover:focus {
    outline: none;
  }

  .btn-hover.color-8 {
    background-image: linear-gradient(
      to right,
      var(--clr-p-2),
      #485563,
      #2b5876,
      #4e4376
    );
    box-shadow: 0 4px 15px 0 rgba(45, 54, 65, 0.75);
  }
`;
export default ListProducts;
