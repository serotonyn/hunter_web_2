import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Box, Button } from "gestalt";

export default class extends React.Component {
  render() {
    const {
      match: { isExact }
    } = this.props;
    return (
      <div>
        <TopBar>
          <h3>Hunter</h3>
          <Center>
            <Link to="">HOME</Link>
            <Link to="">BROWSER</Link>
            <Link to="">START A HUNT</Link>
          </Center>
          <h3>LOGIN</h3>
        </TopBar>
        {isExact ? (
          <Hero>
            <h2>THE CURE FOR STYLE ENVY</h2>
            <p>
              The Hunt is a community that tracks down the items you covet. Snap
              a picture of what you're looking for and get personalized shopping
              suggestions.
            </p>
            <Box
              display="flex"
              direction="row"
              marginLeft={-2}
              marginRight={-2}
            >
              <Box padding={2}>
                <Button text="Android" inline />
              </Box>
              <Box padding={2}>
                <Button text="IPhone" inline />
              </Box>
            </Box>
          </Hero>
        ) : null}
      </div>
    );
  }
}

const TopBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const Center = styled.div`
  width: 25%;
  display: flex;
  justify-content: space-around;
`;
const Hero = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 40px 0;
  & > p {
    width: 30%;
    text-align: center;
  }
`;
