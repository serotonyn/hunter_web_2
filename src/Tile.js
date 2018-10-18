import React from "react";
// import ReactDOM from "react-dom";
import { Card, Box, Mask, Image } from "gestalt";

export default class Tile extends React.Component {
  openInNewTab = id => {
    var win = window.open(`/app_1/${id}`, "_blank");
    win.focus();
  };

  render() {
    const {
      id,
      // name,
      image_url,
      image_height,
      image_width
    } = this.props.cardArgs;
    return (
      <div className="card" onClick={() => this.openInNewTab(id)}>
        <Box column={12}>
          <Card
            image={
              <Mask shape="rounded" wash>
                <Image
                  alt="example.com"
                  // color={`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`}
                  color="-moz-linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
                  naturalHeight={image_height}
                  naturalWidth={image_width}
                  src={image_url}
                />
              </Mask>
            }
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          />
        </Box>
      </div>
    );
  }
}
