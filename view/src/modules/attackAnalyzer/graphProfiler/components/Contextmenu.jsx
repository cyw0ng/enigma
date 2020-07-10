import React from "react";
import { Typography } from "@material-ui/core";

import "./Contextmenu.css";

export default class Contextmenu extends React.Component {
  handleOnMaskClick = (evt) => {
    if (evt.target.dataset.role === "mask") {
      this.props.onCloseContextmenu();
    }
  };

  onNativeCtxm = (evt) => evt.preventDefault();

  render() {
    if (this.props.popupProfile == null) {
      return null;
    }
    const popupProfile = this.props.popupProfile;
    return (
      <div
        className="cont-graphprofiler-ctxm-mask"
        onClick={this.handleOnMaskClick}
        onContextMenu={this.onNativeCtxm}
        data-role="mask"
      >
        <div
          className="cont-graphprofiler-ctxm-main"
          style={{
            left: popupProfile.graph.lastMouseX,
            top: popupProfile.graph.lastMouseY,
          }}
        >
          <Typography>Button1</Typography>
          <Typography>Button2</Typography>
          <Typography>Button3</Typography>
        </div>
      </div>
    );
  }
}
