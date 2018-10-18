import React from "react";
import { Slug, Fade } from "mauerwerk";
// import { Icon } from "antd";

const Cell = ({
  toggle,
  name,
  height,
  description,
  css,
  maximized,
  feed_image_url,
  feed_image_height,
  feed_image_width,
  image_url,
  image_height,
  image_width
}) => (
  <React.Fragment>
    <div
      className={maximized ? "cell2" : "cell"}
      // className="cell"
      style={{ backgroundImage: css, cursor: !maximized ? "pointer" : "auto" }}
      onClick={!maximized ? toggle : undefined}
    >
      <Fade show={maximized} delay={maximized ? 0 : 0}>
        <div className="details">
          <Slug delay={100}>
            {/* <div className="circle" style={{ background: css }} /> */}
            <div
              className="hip"
              style={{
                backgroundImage: `url(${image_url})`,
                height: `${image_height}px`,
                width: `${image_width}px`,
                // backgroundPosition: "0 0",
                backgroundSize: "cover"
              }}
            >
              {/* <img src={image_url} width="100%" alt="as" /> */}
            </div>

            <div className="close">
              <button style={{ cursor: "pointer" }} onClick={toggle}>
                x
              </button>
            </div>
            {name && <h1>{name.substring(1, 12)}</h1>}
            <p style={{ overflow: "scroll" }}>{description}</p>
          </Slug>
        </div>
      </Fade>

      <Fade
        show={!maximized}
        from={{ opacity: 0, transform: "translate3d(0,140px,0)" }}
        enter={{ opacity: 1, transform: "translate3d(0,0px,0)" }}
        leave={{ opacity: 0, transform: "translate3d(0,-50px,0)" }}
        delay={maximized ? 0 : 0}
      >
        <div>
          <img src={feed_image_url} alt="as" />
        </div>
        <div className="default">{name}</div>
      </Fade>
    </div>
    <Fade show={maximized}>
      <div className="right" height={900}>
        <h1>asdsad</h1>
      </div>
    </Fade>
  </React.Fragment>
);
export default Cell;
