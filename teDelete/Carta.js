import React, { Component } from "react";
import {
  Card,
  Image,
  // Text,
  // Button,
  // Avatar,
  // Link,
  Box,
  Mask
  // IconButton
} from "gestalt";

export default class Carta extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
    // this.handleMouseEnter = this._handleMouseEnter.bind(this);
    // this.handleMouseLeave = this._handleMouseLeave.bind(this);
  }
  // _handleMouseEnter() {
  //   this.setState(() => ({ hovered: true }));
  // }
  // _handleMouseLeave() {
  //   this.setState(() => ({ hovered: false }));
  // }

  render() {
    const { data } = this.props;
    return (
      <Box column={12}>
        <Card
          image={
            <Mask shape="rounded" wash>
              <Image
                alt="example.com"
                // color={`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`}
                color="-moz-linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
                naturalHeight={data.feed_image_height}
                naturalWidth={data.feed_image_width}
                src={data.feed_image_url}
              />
            </Mask>
          }
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {/* <Avatar
            name="Ben Silbermann"
            src="https://image.ibb.co/dzLoRv/Ben_Silberman.jpg"
            size="md"
          />
          <Box paddingX={3} paddingY={2}>
            <Text align="center" bold>
              {"Ben"}
            </Text>
            <IconButton
              accessibilityLabel="Love"
              bgColor="white"
              icon="heart"
              iconColor="red"
              onClick={() => {
                console.log("❤️");
              }}
            />
          </Box> */}
        </Card>
      </Box>
    );
  }
}

// render() {
//     const { data } = this.props;
//     return (
//       <Box column={12}>
//         <Card
//           image={
//             <Mask shape="rounded" wash>
//               <Image
//                 alt="example.com"
//                 color="rgb(111, 91, 77)"
//                 naturalHeight={data.feed_image_height}
//                 naturalWidth={data.feed_image_width}
//                 src={data.feed_image_url}
//               />
//             </Mask>
//           }
//           onMouseEnter={this.handleMouseEnter}
//           onMouseLeave={this.handleMouseLeave}
//         >
//           <Avatar
//             name="Ben Silbermann"
//             src="https://image.ibb.co/dzLoRv/Ben_Silberman.jpg"
//             size="md"
//           />
//           <Box paddingX={3} paddingY={2}>
//             <Text align="center" bold>
//               {'Ben'}
//             </Text>
//             <IconButton
//               accessibilityLabel="Love"
//               bgColor="white"
//               icon="heart"
//               iconColor="red"
//               onClick={() => {
//                 console.log('❤️');
//               }}
//             />
//           </Box>
//         </Card>
//       </Box>

//       // >
//       //
//       // </Box>
//     );
//   }
