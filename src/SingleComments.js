import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Mask, Image, Avatar, IconButton } from "gestalt";
import { Input, Form, Button } from "semantic-ui-react";
import moment from "moment";
import { cardQuery } from "./SinglePinterest";

// const notesQuery = gql`
//   query NotesQuery {
//     notes {
//       id
//       type
//       contents
//       product_name
//       url
//       feed_image_url
//       preload_image_url
//       image_width
//       feed_image_height
//       user_name
//       created_at
//       likes_count
//       price
//     }
//   }
// `;

const likeNote = gql`
  mutation LikeNote($noteId: String!) {
    authUserLikesANote(noteId: $noteId) {
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
`;

const createNoteMutation = gql`
  mutation CreateNoteMutation(
    $product_name: String
    $image_url: String
    $image_width: Int
    $image_height: Int
    $product_page_url: String
    $price: String
    $contents: String
    $cardId: String!
    $created_at: String
  ) {
    createNote(
      product_name: $product_name
      image_url: $image_url
      image_width: $image_width
      image_height: $image_height
      product_page_url: $product_page_url
      price: $price
      contents: $contents
      cardId: $cardId
      created_at: $created_at
    ) {
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
`;

export default class SingleComments extends Component {
  state = {
    imageChooser: true,
    choosedNote: {},
    notes: this.props.notes
  };

  handleChooseImage = id => {
    // const choosedNote = this.props.notes.find(note => note.id === id);
    this.setState({
      choosedNote: this.props.noteToBeCreated,
      imageChooser: false
    });
  };

  handleDescribeTitle = e => {
    const choosedNote = { ...this.state.choosedNote };
    choosedNote.product_name = e.target.value;
    this.setState({ choosedNote });
  };

  handlePriceChange = e => {
    let choosedNote = { ...this.state.choosedNote };
    choosedNote.price = e.target.value;
    this.setState({ choosedNote });
  };
  handleContentsChange = e => {
    let choosedNote = { ...this.state.choosedNote };
    choosedNote.contents = e.target.value;
    this.setState({ choosedNote });
  };
  render() {
    const { noteToBeCreated } = this.props;
    const { imageChooser } = this.state;
    const { notes } = this.state;
    return (
      <div>
        {noteToBeCreated.url && imageChooser ? (
          <div>
            {/* {notes.map(note => { */}
            <h3>Select an image</h3>
            <img
              // key={note.id}
              src={noteToBeCreated.image_url}
              alt=""
              width={160}
              onClick={() => this.handleChooseImage()}
            />
            {/* })} */}
          </div>
        ) : !imageChooser ? (
          <div style={{ display: "flex" }}>
            <img src={this.state.choosedNote.image_url} alt="" width={160} />
            <div>
              <h3>Describe this find...</h3>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Mutation mutation={createNoteMutation}>
                  {mutate => (
                    <Form onSubmit={this.handleSubmitNote}>
                      <Form.Field>
                        <Input
                          value={this.state.choosedNote.product_name}
                          onChange={this.handleDescribeTitle}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Input
                          placeholder="price"
                          onChange={this.handlePriceChange}
                        />
                      </Form.Field>
                      <Form.Field>
                        <Input
                          placeholder="Say something nice..."
                          onChange={this.handleContentsChange}
                        />
                      </Form.Field>
                      <Button
                        onClick={async () => {
                          const response = await mutate({
                            variables: {
                              cardId: this.props.cardId,
                              ...this.state.choosedNote,
                              created_at: new Date()
                            }
                          });
                          this.setState({
                            notes: [response.data.createNote, ...notes],
                            imageChooser: true
                          });
                          this.props.restoreAddAFindInput();
                          // console.log(this.state.notes);
                        }}
                      >
                        Validate
                      </Button>
                    </Form>
                  )}
                </Mutation>
              </div>
            </div>
          </div>
        ) : null}

        {notes.map(note => (
          <div key={note.id} style={{ width: 500 }}>
            <div style={{ display: "flex", width: 300, height: 250 }}>
              <div
                className="image_hunter"
                style={{ width: 190, marginRight: 20 }}
              >
                <Mask shape="rounded" wash>
                  <Image
                    alt="example.com"
                    // color={`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`}
                    color="-moz-linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
                    naturalHeight={133}
                    naturalWidth={123}
                    src={note.image_url}
                  />
                </Mask>
              </div>
              <div>
                <span>
                  <h3>{note.product_name}</h3>
                </span>
                {/* TODO   refaire la regex */}
                <div style={{ paddingBottom: 20 }}>
                  <h5>
                    {/* via {note.url.match(/https?:\/\/(www.)?(\S+)\//)[2]} */}
                  </h5>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    size="md"
                    src="/gestalt/static/media/keerthi.b283324e.jpg"
                    name="Keerthi"
                  />
                  <span style={{ marginRight: 5, marginLeft: 5 }}>
                    {note.user.pseudo}
                  </span>
                  <span>{moment(note.created_at).fromNow()}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <Mutation mutation={likeNote}>
                      {mutate => (
                        <IconButton
                          accessibilityLabel="Love"
                          bgColor="white"
                          icon="heart"
                          iconColor="red"
                          onClick={async () => {
                            console.log("❤️", note.id);
                            const response = await mutate({
                              refetchQueries: [{ query: cardQuery }],
                              variables: {
                                noteId: note.id
                              }
                            });
                            // console.log(
                            //   "respo",
                            //   response.data.authUserLikesANote.likes_count
                            // );
                            const newCount =
                              response.data.authUserLikesANote.likes_count;
                            const noteToUpdate = this.state.notes.find(
                              n => n.id === note.id
                            );
                            noteToUpdate.likes_count = newCount;
                            this.setState(state => ({
                              ...state,
                              notes: Object.assign({}, state.notes)
                            }));
                            console.log("no", noteToUpdate);
                          }}
                        />
                      )}
                    </Mutation>
                    <span
                      style={{
                        padding: 12,
                        fontSize: 21
                      }}
                    >
                      {note.likes_count}
                    </span>
                  </div>
                  <span>
                    <h3>${note.price}</h3>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
