import styled from "styled-components";
import Hero from "../components/Hero";

const About = () => {
  return (
    <Wrapper>
      <Hero page={"About"}></Hero>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
`;
export default About;
