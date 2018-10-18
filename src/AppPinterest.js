import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
// import { Masonry } from "gestalt";
// import Carta from "./Carta";
// import Top from "./Top";
// import Masonry from "./Masonry";
import MasonPinterest from "./MasonPinterst";

const allCardsQuery = gql`
  query AllCardsQuery($limit: Int, $offset: Int) {
    cards(limit: $limit, offset: $offset) {
      id
      name
      description
      css
      feed_image_url
      feed_image_width
      feed_image_height
      image_url
      image_width
      image_height
    }
  }
`;

export default class AppPinterest extends React.Component {
  state = {
    // loading: false,
    // hasMoreItems: true,
    data: [],
    cursor: "",
    variables: {
      limit: 50,
      offset: 0
    }
  };

  // async componentWillMount() {
  // const response = await fetch(
  //   "https://api.pinterest.com/v1/boards/artistshavetoeat/clothing/pins/?access_token=Aov4LOllCKSwtpWqhMJBnh_TCXl4FV2Bh86oSEZFT_R6ZSBfJQWpwDAAACaPRU_1nqNAYIcAAAAA&limit=100&fields=id%2Clink%2Cnote%2Curl%2Cimage%2Cmedia"
  // );
  // const json = await response.json();
  // console.log(json);
  // this.setState({ data: json.data, cursor: json.page.cursor });
  // }

  render() {
    // const { cursor } = this.state;
    return (
      <Query query={allCardsQuery}>
        {({ loading, data, fetchMore }) => {
          if (loading) return null;
          // console.log(data);
          return (
            <div>
              {/* <Top /> */}
              {data.cards.length ? (
                <MasonPinterest
                  cards={data.cards}
                  // cursor={cursor}
                  fetchMore={fetchMore}
                />
              ) : null}
            </div>
          );
        }}
      </Query>
    );
  }
}
