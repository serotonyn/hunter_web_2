import React from "react";
// import ReactDOM from "react-dom";
import { Card, Box, Mask, Image } from "gestalt";

export default class TilePinterest extends React.Component {
  openInNewTab = id => {
    var win = window.open(`/app_1/${id}`, "_blank");
    win.focus();
  };

  render() {
    return (
      <div className="card" onClick={() => this.openInNewTab(this.props.id)}>
        <Box column={12}>
          <Card
            image={
              <Mask shape="rounded" wash>
                <Image
                  alt="example.com"
                  // color={`linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)`}
                  color="-moz-linear-gradient(120deg, #f093fb 0%, #f5576c 100%)"
                  naturalHeight={this.props.height}
                  naturalWidth={this.props.width}
                  src={this.props.link}
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
