import React from "react";
import { Typography } from "@material-ui/core";
import { CSSTransitionGroup } from "react-transition-group";

import "./Contextmenu.css";

export default class Contextmenu extends React.Component {
  btns = [
    {
      id: "obj-type",
      style: { fontWeight: "bold" },
      appearsCb: (popupType) =>
        ["mask", "vertex", "edge"].indexOf(popupType) > -1,
      textCb: (popupType) => popupType,
    },
  ];

  handleOnMaskClick = (evt) => {
    if (evt.target.dataset.role === "mask") {
      this.props.onCloseContextmenu();
    }
  };

  onNativeCtxm = (evt) => evt.preventDefault();

  getPopupType = (cell) => {
    if (cell == null) {
      return "mask";
    }

    if (cell.vertex) {
      return "vertex";
    }

    if (cell.edge) {
      return "edge";
    }
  };

  render() {
    if (this.props.popupProfile == null) {
      return null;
    }
    const popupProfile = this.props.popupProfile;
    const popupType = this.getPopupType(popupProfile.cell);
    return (
      <div
        className="cont-graphprofiler-ctxm-mask"
        onClick={this.handleOnMaskClick}
        onContextMenu={this.onNativeCtxm}
        data-role="mask"
      >
        <CSSTransitionGroup
          transitionName="trans-graphprofiler-ctxm"
          transitionAppear={true}
          transitionAppearTimeout={100}
        >
          <div
            className="cont-graphprofiler-ctxm-main"
            style={{
              left: popupProfile.graph.lastMouseX,
              top: popupProfile.graph.lastMouseY,
            }}
          >
            {this.btns.map((btn) =>
              btn.appearsCb(popupType) ? (
                <Typography style={btn.style}>
                  {btn.textCb(popupType)}
                </Typography>
              ) : null
            )}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}
