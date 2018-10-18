import React, { Component } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

// import state from "./state3";

const backgrounds = [
  "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(-225deg, #E3FDF5 0%, #FFE6FA 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(to top, #ebc0fd 0%, #d9ded8 100%)",
  "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
  "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
  "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)",
  "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)",
  "linear-gradient(to top, #c1dfc4 0%, #deecdd 100%)",
  "linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%)"
];

const createNoteMutation = gql`
  mutation CreateCard(
    $css: String
    $title: String
    $description: String
    $datetime: Int
    $type: String
    $width: Int
    $height: Int
    $size: Int
    $views: Int
    $link: String
    $vote: String
    $favorite: Boolean
    $comment_count: Int
    $account_url: String
    $account_id: Int
    $ups: Int
    $downs: Int
    $points: Int
    $score: Int
    $is_album: Boolean
    $in_most_viral: Boolean
  ) {
    createCard(
      css: $css
      title: $title
      description: $description
      datetime: $datetime
      type: $type
      width: $width
      height: $height
      size: $size
      views: $views
      link: $link
      vote: $vote
      favorite: $favorite
      comment_count: $comment_count
      account_url: $account_url
      account_id: $account_id
      ups: $ups
      downs: $downs
      points: $points
      score: $score
      is_album: $is_album
      in_most_viral: $in_most_viral
    )
  }
`;

export default class Delete extends Component {
  state = {
    data: []
  };

  async componentDidMount() {
    const response = await fetch(
      "https://api.imgur.com/3/gallery/hot/viral/day/1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer b9afa9d970e5a547e289a10800bf672fc3e5d830",
          "Content-Type": "application/json"
        }
      }
    );
    const json = await response.json();
    let images = [];
    json.data.map(x => {
      if (x.images) {
        return x.images.map(y => {
          if (y.type.match(/image\/png/gm) || y.type.match(/image]\/jpeg/gm)) {
            images = [...images, ...x.images];
            return null;
          }
        });
      }
    });

    this.setState({ data: images });
    console.log("go. Image #: ", images.length);

    // this.setState({ data: json.data.slice(0, 1)[0].images });
  }

  render() {
    const { data } = this.state;
    {
      return !data ? null : (
        <Mutation mutation={createCardMutation}>
          {mutate => (
            <div>
              {/* {console.log(data)} */}
              <button
                onClick={async () => {
                  data.map(async x => {
                    await mutate({
                      variables: {
                        css: backgrounds[Math.floor(Math.random() * 12 + 1)],
                        title: x.title,
                        description: x.description,
                        datetime: x.datetime,
                        type: x.type,
                        width: x.width,
                        height: x.height,
                        size: x.size,
                        views: x.views,
                        link: x.link,
                        vote: x.vote,
                        favorite: x.favorite,
                        comment_count: x.comment_count,
                        account_url: x.account_url,
                        account_id: x.account_id,
                        ups: x.ups,
                        downs: x.downs,
                        points: x.points,
                        score: x.score,
                        is_album: x.is_album,
                        in_most_viral: x.in_most_viral
                      }
                    });
                  });
                }}
              >
                batch
              </button>
            </div>
          )}
        </Mutation>

        // <div>sympa</div>
      );
    }
  }
}
