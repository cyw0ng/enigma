import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { mxGraph, mxEvent, mxCompactTreeLayout, mxConstants } from "mxgraph-js";
import Toolbar from "./components/Toolbar";
import ContextMenu from "./components/Contextmenu";
import RightPanel from "./components/RightPanel";

export default class GraphProfiler extends Component {
  state = {
    graphObj: null,
    isFullScreen: false,
    popupProfile: null,
    mxObjectIdFocused: "",
  };

  componentDidMount() {
    this.loadGraph();
  }

  selectionChange = (sender, evt) => {
    if (evt.properties.removed == null) {
      if (this.state.mxObjectIdFocused !== "") {
        this.setState({ mxObjectIdFocused: "" });
      }
    } else {
      const removedEvt = evt.properties.removed[0];
      if (removedEvt != null) {
        this.setState({ mxObjectIdFocused: removedEvt.mxObjectId });
      } else {
        this.setState({ mxObjectIdFocused: "" });
      }
    }
  };

  /**
   * LoadGraph: Init function of mxGraph
   *
   * This function contains steps to init a mxGraph
   */
  loadGraph = () => {
    // 1. Init core vars, prepare graph and layout
    let container = ReactDOM.findDOMNode(this.refs.divGraph);
    const graph = new mxGraph(container);
    const layout = new mxCompactTreeLayout(graph, false);

    // 2. Disable native contextmenu
    mxEvent.disableContextMenu(container);

    // 3. Init other components related to graph, add change listerner
    graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionChange);
    graph.allowDanglingEdges = false;
    graph.cellsEditable = false;
    // graph.addListener(mxEvent.CLICK, this.selectionChange);

    // 4. Set default colors
    mxConstants.STYLE_FILLCOLOR = "white";
    mxConstants.STYLE_FONTCOLOR = "black";

    graph.getModel().addListener("change", (evt) => {
      console.log("changed", evt);
    });

    graph.popupMenuHandler.factoryMethod = (menu, cell, evt) =>
      this.setState({
        popupProfile: {
          graph,
          menu,
          cell,
          evt,
        },
      });

    // 4. mount graph & layout to object
    this.setState(
      {
        graphObj: {
          graph,
          layout,
        },
      },
      () => {
        // 5. Deploy graph ondemand
        this.loadGraphDemo();
      }
    );
  };

  handleFullScreenSwitch = () => {
    let currentStatus = this.state.isFullScreen;
    let profilerRoot = ReactDOM.findDOMNode(this.refs.attackProfiler);
    this.setState({ isFullScreen: !currentStatus }, () =>
      currentStatus
        ? document.exitFullscreen()
        : profilerRoot.requestFullscreen()
    );
  };

  handleCloseContextmenu = () => {
    this.setState({ popupProfile: null });
  };

  handleVertexRename = (changedName, cell) => {
    this.state.graphObj.graph.model.setValue(cell, changedName);
    this.setState({ graphObj: this.state.graphObj });
  };

  loadGraphDemo = () => {
    let graph = this.state.graphObj.graph;
    let parent = graph.getDefaultParent();

    // Adds cells to the model in a single step
    graph.getModel().beginUpdate();
    const v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
    const v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
    graph.insertEdge(parent, null, "", v1, v2);
    // Updates the display
    graph.getModel().endUpdate();
  };

  render() {
    return (
      <div>
        <div className="container-wrapper" ref="attackProfiler">
          <ContextMenu
            popupProfile={this.state.popupProfile}
            onCloseContextmenu={this.handleCloseContextmenu}
            onVertexRename={this.handleVertexRename}
          />
          <div className="cont-graphprofiler-toolbar-root">
            <Toolbar
              graphObj={this.state.graphObj}
              onFullScreenSwitch={this.handleFullScreenSwitch}
              isFullScreen={this.state.isFullScreen}
            />
          </div>
          <div className="cont-graphprofiler-rpanel-root">
            <RightPanel
              mxObjectIdFocused={this.state.mxObjectIdFocused}
              graphObj={this.state.graphObj}
            />
          </div>
          <div
            className="container"
            ref="divGraph"
            onClick={this.handleCloseContextmenu}
          />
        </div>
      </div>
    );
  }
}
