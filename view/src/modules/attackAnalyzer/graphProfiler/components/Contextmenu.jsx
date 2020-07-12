import React from "react";
import { withSnackbar } from "notistack";
import { CSSTransitionGroup } from "react-transition-group";
import TextField from "@material-ui/core/TextField";

import "./Contextmenu.css";

class Contextmenu extends React.Component {
  btns = [
    {
      id: "vertex-rename",
      appearsCb: (cell) => ["vertex"].indexOf(this.getPopupType(cell)) > -1,
      childrenCb: (cell) => {
        return (
          <TextField
            onKeyUp={(evt) => this.handleVertexRenameKeyUp(evt, cell)}
            id="standard-basic"
            size="small"
            defaultValue={cell.value}
            className="cont-graphprofiler-ctxm-ipt"
          />
        );
      },
    },
  ];

  handleVertexRenameKeyUp = (evt, cell) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
      if (evt.target.value !== cell.value) {
        if (evt.target.value.length === 0) {
          this.props.enqueueSnackbar("Cannot change name to null", {
            autoHideDuration: 5000,
          });
        }
        this.props.onVertexRename(evt.target.value, cell);
      } else {
        this.props.enqueueSnackbar(
          "Cannot change name, since the new one is same as old",
          {
            autoHideDuration: 5000,
          }
        );
      }
    }
  };

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
              btn.appearsCb(popupProfile.cell)
                ? btn.childrenCb(popupProfile.cell)
                : null
            )}
          </div>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default withSnackbar(Contextmenu);
