import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";
import image1 from "../assets/cor1.jpg";
import image2 from "../assets/cor2.jpg";
import { homeService } from "../data";
const Home = () => {
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
              <div key={id}>
                <Icon />
                <div>
                  <h5>{heading}</h5>
                  <small>{description}</small>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  .services {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 2rem 0;
    > div {
      display: flex;
      align-items: center;
      gap: 1rem;

      svg {
        font-size: 3rem;
      }
    }
  }
`;
export default Home;
