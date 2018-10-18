import React, { Component } from "react";
import Bricks from "bricks.js";
import { gql } from "apollo-boost";

const allCardsQuery = gql`
  query AllCardsQuery {
    allCards {
      id
      css
      title
      description
      datetime
      type
      width
      height
      size
      views
      link
      vote
      favorite
      comment_count
      account_url
      account_id
      ups
      downs
      points
      score
      is_album
      in_most_viral
    }
  }
`;

const sizes = [
  { columns: 2, gutter: 10 },
  // { mq: "68px", columns: 3, gutter: 25 },
  { mq: "1024px", columns: 8, gutter: 35 }
];
export default class Masonry extends Component {
  componentDidMount() {
    window.addEventListener("scroll", window => this.handleScroll(window));
    this.instance = Bricks({
      container: ".grid",
      packed: "data-packed",
      sizes: sizes,
      position: false
    }).pack();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = window => {
    // if (
    //   this.scroller
    //   // this.scroller.scrollTop === this.scroller.scrollTopMax
    // ) {
    console.log(window.scrollTop);
    // }
  };

  render() {
    return (
      <div
        className="grid"
        style={{ margin: "0 auto" }}
        // ref={scroller => (this.scroller = scroller)}
        // onScroll={this.handleScroll}
        style={{ background: "teal" }}
      >
        {this.props.cards.map(x => {
          return (
            <div
              key={x.id}
              className="card"
              style={{
                height: x.height / 4,
                background: x.css
              }}
              data-packed=""
            />
          );
        })}
      </div>
    );
  }
}
