import React, { Component } from "react";
import { Avatar, Button, Box, Image, Mask } from "gestalt";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import { Label, Text } from "gestalt";
import { Input, Form } from "semantic-ui-react";
import SingleComments from "./SingleComments";
import { getFindPinterest } from "./getFinds/pinterest";

export const cardQuery = gql`
  query CardQuery($id: Int) {
    card(id: $id) {
      id
      image_url
      image_width
      image_height
      name
      user {
        pseudo
      }
      notes {
        id
        product_name
        image_url
        image_width
        image_height
        product_page_url
        price
        contents
        likes_count
        time_ago_abbrev
        created_at
        user {
          pseudo
        }
      }
    }
  }
`;

export default class SinglePinterest extends Component {
  state = {
    card: {},
    notes: [],
    noteToBeCreated: {},
    inputValue: "",
    sharedLinks: [],
    isFetchingNote: false
  };

  async componentDidMount() {
    // const {
    //   match: {
    //     params: { id }
    //   }
    // } = this.props;
    // // console.log(id);
    // try {
    //   const response = await fetch(
    //     `https://api.pinterest.com/v1/pins/${id}/?access_token=Aov4LOllCKSwtpWqhMJBnh_TCXl4FV2Bh86oSEZFT_R6ZSBfJQWpwDAAACaPRU_1nqNAYIcAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage`
    //   );
    //   const json = await response.json();
    //   // console.log(json);
    //   this.setState({ card: json.data });
    // } catch (e) {
    //   console.log(e);
    // }
  }

  handleChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = async () => {
    const url = this.state.inputValue;
    this.setState({ isFetchingNote: true });
    if (url.includes("pinterest")) {
      const pinId = url.match(/pin\/(\S+)\//)[1];
      const note = await getFindPinterest(pinId);
      this.setState({
        noteToBeCreated: {
          product_name: note.note,
          url: note.url,
          image_url: note.image.original.url,
          image_width: note.image.original.width,
          image_height: note.image.original.height
        }
      });
    }
  };

  restoreAddAFindInput = () => {
    this.setState({ noteToBeCreated: {}, inputValue: "" });
  };

  render() {
    const { isFetchingNote } = this.state;
    let {
      match: {
        params: { id }
      }
    } = this.props;
    // id = +id;
    return (
      <Query query={cardQuery} variables={{ id: +id }}>
        {({ loading, data }) => {
          if (loading) return null;
          console.log("rendering", data);
          const card = data.card;

          return !card.id ? null : (
            <div
              style={{
                display: "grid",
                gridTemplateRows: "1fr",
                gridTemplateColumns: "1fr 1fr",
                marginTop: "100px",
                justifyItems: "center"
              }}
            >
              <div className="left">
                <Mask shape="rounded" wash>
                  <Image
                    alt="example.com"
                    // color={`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`}
                    color="-moz-linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
                    naturalHeight={card.image_height}
                    naturalWidth={card.image_width}
                    src={card.image_url}
                  />
                </Mask>
                <h4>{card.name.substring(0, 20)}</h4>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div
                    className="avatarAndPseudo"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar
                      size="md"
                      src="/gestalt/static/media/keerthi.b283324e.jpg"
                      name="Keerthi"
                    />
                    <h4>@{card.user.pseudo}</h4>
                  </div>
                  <Button text="S'abonner" inline />
                </div>
                <div>{card.name}</div>
              </div>

              <div className="right" style={{ justifySelf: "left" }}>
                {this.state.notes.length === 0 &&
                !this.state.noteToBeCreated.url ? (
                  <Box marginBottom={2}>
                    <Label htmlFor="asd">
                      {!isFetchingNote ? (
                        <Text>Where can you find this ?</Text>
                      ) : (
                        <Text>Fetching images...</Text>
                      )}
                      <Form onSubmit={this.handleSubmit}>
                        <Input
                          onChange={this.handleChange}
                          placeholder="http://..."
                          value={this.state.inputValue}
                        />
                      </Form>
                    </Label>
                  </Box>
                ) : null}
                <SingleComments
                  notes={card.notes}
                  noteToBeCreated={this.state.noteToBeCreated}
                  cardId={id}
                  restoreAddAFindInput={this.restoreAddAFindInput}
                  // huntImage={card.image.original.url}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}
