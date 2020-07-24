import React from "react";
import { withSnackbar } from "notistack";
import { CSSTransitionGroup } from "react-transition-group";
import TextField from "@material-ui/core/TextField";
import Typograph from "@material-ui/core/Typography";
import gprofModels from "../model/gprof";

import "./Contextmenu.css";

class Contextmenu extends React.Component {
  btns = [
    {
      id: "rename",
      appearsCb: (cell) =>
        ["vertex", "edge"].indexOf(this.getPopupType(cell)) > -1,
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
    {
      id: "remove-vertex-or-edge",
      appearsCb: (cell) =>
        ["vertex", "edge"].indexOf(this.getPopupType(cell)) > -1,
      childrenCb: (cell) => {
        return (
          <Typograph
            className="cont-graphprofiler-ctxm-btn"
            onClick={(evt) => this.handleDeleteCell(evt, cell)}
          >
            Remove {this.getPopupType(cell)}
          </Typograph>
        );
      },
    },
    {
      id: "add-new-vertex",
      appearsCb: (cell) => ["mask"].indexOf(this.getPopupType(cell)) > -1,
      childrenCb: (cell) => {
        return (
          <Typograph
            className="cont-graphprofiler-ctxm-btn"
            onClick={(evt) => this.handleAddVertex(evt, cell)}
          >
            Add module
          </Typograph>
        );
      },
    },
    {
      id: "detailed-config",
      appearsCb: (cell) =>
        ["vertex", "edge"].indexOf(this.getPopupType(cell)) > -1,
      childrenCb: (cell) => (
        <Typograph
          className="cont-graphprofiler-ctxm-btn"
          onClick={(evt) => this.handleCellDetails(evt, cell)}
        >
          Configuration
        </Typograph>
      ),
    },
    {
      id: "add-new-edge",
      appearsCb: (cell) =>
        ["vertex", "edge"].indexOf(this.getPopupType(cell)) > -1,
      childrenCb: (cell) => (
        <Typograph
          className="cont-graphprofiler-ctxm-btn"
          onClick={(evt) => this.handleAddNewEdge(evt, cell)}
        >
          Add new flow
        </Typograph>
      ),
    },
  ];

  handleCellDetails = (evt, cell) => {
    this.props.handleCellDetails(cell);
  };

  handleAddNewEdge = (evt, cell) => {
    this.props.handleAddNewEdge(cell);
    this.props.onCloseContextmenu();
  };

  handleAddVertex = (evt, cell) => {
    let graph = this.props.popupProfile.graph;
    if (graph == null) {
      return;
    }

    let position = document
      .querySelector(".cont-graphprofiler-root")
      .getBoundingClientRect();
    let parent = graph.getDefaultParent();
    graph.getModel().beginUpdate();
    let insertedVertex = graph.insertVertex(
      parent,
      null,
      "<Named Later>",
      evt.clientX - position.x,
      evt.clientY - position.y,
      80,
      30
    );
    insertedVertex.gprof = gprofModels.getDefaultVertex(insertedVertex);
    graph.getModel().endUpdate();
  };

  handleDeleteCell = (evt, cell) => {
    let graph = this.props.popupProfile.graph;
    if (cell != null && this.props.popupProfile.graph != null) {
      graph.getModel().beginUpdate();
      this.props.popupProfile.graph.removeCells([cell]);
      graph.getModel().endUpdate();
    }
  };

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
