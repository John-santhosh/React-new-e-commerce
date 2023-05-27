import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import image1 from "../assets/cor1.jpg";
import image2 from "../assets/cor2.jpg";
import { homeService } from "../data";
import "animate.css";
import { useProductsProvider } from "../context/ProductsContext";
import ProductsPageGrid from "../components/ProductsPageGrid";
const Home = () => {
  const { featured_Products, products_loading, products_error } =
    useProductsProvider();
  // console.log(state);
  return (
    <Wrapper>
      <Carousel fade>
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Second slide" />
        </Carousel.Item>
      </Carousel>
      <div className="section-center">
        <div className="services">
          {homeService.map(({ id, Icon, heading, description }) => {
            return (
              <div
                key={id}
                onMouseEnter={(e) => {
                  const element = e.currentTarget.querySelector("div");

                  element.classList.add("animate__jello");
                  setTimeout(() => {
                    element.classList.remove("animate__jello");
                  }, 500);
                }}
              >
                <div className="animate__animated">
                  <Icon />
                </div>

                <div>
                  <h5>{heading}</h5>
                  <small>{description}</small>
                </div>
              </div>
            );
          })}
        </div>
        <div className="featured_products mb-5">
          <h2>Featured Products</h2>
          <div className="">
            <h5 className="text-center my-4">Best sellers</h5>
            <ProductsPageGrid></ProductsPageGrid>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .featured_products {
    > h2 {
      position: relative;
      text-align: center;
      ::before,
      ::after {
        content: "";
        width: 10%;
        height: 2px;
        top: 1rem;
        right: var(--h2-pos);
        background-color: var(--clr-p-1);
        position: absolute;
      }
      ::before {
        right: unset;
        left: var(--h2-pos);
      }
    }
  }
  .services {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    margin: 4rem 0;
    > div {
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;

      svg {
        font-size: 3rem;
      }
    }
  }
  @media only screen and (max-width: 992px) {
    .services {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
  }
  @media only screen and (max-width: 500px) {
    .services {
      grid-template-columns: 1fr;
      > div {
        justify-content: center;
      }
    }
  }
`;
export default Home;
