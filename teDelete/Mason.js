import React from "react";
// import shortid from "shortid";
import ReactBricks from "react-bricks-infinite";
import Tile from "../Tile";
// import ReactDOM from "react-dom";

export default class Mason extends React.Component {
  constructor(props) {
    super(props);

    this.heights = [150, 250, 200, 350, 400, 450];

    // this.elements = this.generateElements();
    this.state = {
      bricks: this.getBricks(this.props.cards),
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

  loadMore = () => {
    // this.elements = this.elements.concat(this.generateElements());
    if (this.state.hasMoreItems) {
      this.props.fetchMore({
        variables: {
          limit: 20,
          offset: this.state.bricks.length + 1
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return null;
          // const bricks = [...prev.cards, ...fetchMoreResult.cards];
          // this.setState({bricks})
          if (fetchMoreResult.cards.length < 20)
            this.setState({ hasMoreItems: false });
          const bricks = this.getBricks(fetchMoreResult.cards);
          this.setState(state => ({ bricks: [...state.bricks, ...bricks] }));
        }
      });
      console.log("inside setTimeout");
      // this.setState({ loading: false });
    }
  };

  getBricks = cards => {
    let results = null;
    console.log(cards);

    results = cards.map(
      (
        {
          id,
          css,
          feed_image_height,
          feed_image_width,
          description,
          feed_image_url
        },
        i
      ) => {
        return (
          <Tile
            key={id}
            className="card"
            style={{
              background: css,
              height: feed_image_height
            }}
            data={i}
            description={description}
            link={feed_image_url}
            height={feed_image_height}
            width={feed_image_width}
            history={this.props.history}
            id={id}
          />
        );
      }
    );
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
