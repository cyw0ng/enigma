import React from "react";

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

    return (
      <div
        className="cont-graphprofiler-ctxm-mask"
        onClick={this.handleOnMaskClick}
        onContextMenu={this.onNativeCtxm}
        data-role="mask"
      >
        <div className="cont-graphprofiler-ctxm-main">Contextmenu</div>
      </div>
    );
  }
}
