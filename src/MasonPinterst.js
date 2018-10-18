import React from "react";
// import shortid from "shortid";
import ReactBricks from "react-bricks-infinite";
import Tile from "./Tile";
// import ReactDOM from "react-dom";

export default class MasonPinterest extends React.Component {
  constructor(props) {
    super(props);
    this.heights = [150, 250, 200, 350, 400, 450];

    // this.elements = this.generateElements();
    this.state = {
      bricks: this.getBricks(this.props.cards),
      cursor: this.props.cursor,
      reRender: false,
      loading: false,
      hasMoreItems: true
    };

    window.onresize = () => {
      this.setState({ reRender: true });
    };

    this.defaultLoaderStyle = {
      spinnerSize: 64
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ bricks: this.getBricks() });
  }

  // getRandomElement = array => {
  //   return array[Math.floor(Math.random() * array.length)];
  // };

  // generateElements = () =>
  //   [...Array(10).keys()].map(() => ({
  //     key: shortid.generate(),
  //     color: this.getRandomElement(this.colors),
  //     height: this.getRandomElement(this.heights)
  //   }));

  loadMore = async () => {
    if (!this.state.loading) {
      this.setState({ loading: true });
      this.props.fetchMore({
        variables: {
          limit: 25,
          offset: this.state.bricks.length + 1
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return null;
          if (fetchMoreResult.cards.length < 25)
            this.setState({ hasMoreItems: false });
          const bricks = this.getBricks(fetchMoreResult.cards);
          this.setState(state => ({
            bricks: [...state.bricks, ...bricks],
            loading: false
          }));
        }
      });
      console.log("inside setTimeout");
      // this.setState({ loading: false });
    }
  };
  // if (!this.state.loading) {
  // const response = await fetch(
  //   `https://api.pinterest.com/v1/boards/artistshavetoeat/clothing/pins/?access_token=Aov4LOllCKSwtpWqhMJBnh_TCXl4FV2Bh86oSEZFT_R6ZSBfJQWpwDAAACaPRU_1nqNAYIcAAAAA&fields=id%2Clink%2Cnote%2Curl%2Cimage%2Cmedia&cursor=${
  //     this.state.cursor
  //   }`
  // );
  // const json = await response.json();
  // this.setState({ cursor: json.page.cursor });
  // const bricks = this.getBricks(json.data);
  // this.setState(state => ({ bricks: [...state.bricks, ...bricks] }));
  // console.log(this.state);
  // console.log("inside setTimeout");
  // this.setState({ loading: false });
  // this.setState({ loading: false });
  // }
  // };

  getBricks = cards => {
    let results = null;
    results = cards.map((args, i) => {
      // ({ id, image_url, name, image_width, image_height }, i) => {
      return (
        <Tile
          key={args.id}
          className="card"
          style={{
            background: "gray",
            height: args.image_height
          }}
          data={i}
          cardArgs={args}
          // history={this.props.history}
        />
      );
    });
    return results;
  };

  render() {
    return (
      <div className="app">
        <ReactBricks
          containerId={"bricks-container-app"}
          loadMoreBricks={this.loadMore}
          ref={ref => (this.reactBricks = ref)}
          hasMoreBricks={true}
          reRender={this.state.reRender}
          bricks={this.state.bricks}
          defaultLoaderStyle={this.defaultLoaderStyle}
        />
      </div>
    );
  }
}
