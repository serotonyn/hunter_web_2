import React, { Component } from "react";
import { Avatar, Button, Box, Image, Mask } from "gestalt";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Label, Text } from "gestalt";
import { Input } from "semantic-ui-react";
// import styled from "styled-components";
import SingleComments from "../SingleComments";

const cardQuery = gql`
  query CardQuery($id: Int) {
    card(id: $id) {
      id
      feed_image_url
      feed_image_width
      feed_image_height
      name
      description
    }
  }
`;

export default class Single extends Component {
  state = {
    inputValue: "",
    sharedLinks: []
  };

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    return (
      <Query query={cardQuery} variables={{ id: +id }}>
        {({ loading, data }) => {
          if (loading) return null;
          const { card } = data;
          return (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "200px"
                // width: "70%"
              }}
            >
              <Box column={3} marginRight={9}>
                <Mask shape="rounded" wash>
                  <Image
                    alt="example.com"
                    // color={`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`}
                    color="-moz-linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
                    naturalHeight={card.feed_image_height}
                    naturalWidth={card.feed_image_width}
                    src={card.feed_image_url}
                  />
                </Mask>
                <h4>{card.name}</h4>
                <div>
                  <Box display="flex" justifyContent="between" column={7}>
                    <Avatar
                      size="md"
                      src="/gestalt/static/media/keerthi.b283324e.jpg"
                      name="Keerthi"
                    />
                    <Button text="S'abonner" inline />
                  </Box>
                  <div>{card.description}</div>
                </div>
              </Box>
              <div>
                <Box marginBottom={2}>
                  <Label htmlFor="asd">
                    <Text>Where can you find this ?</Text>
                    <Input
                      onChange={this.handleChange}
                      placeholder="http://..."
                      value={this.state.inputValue}
                    />
                  </Label>
                </Box>

                <SingleComments />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
