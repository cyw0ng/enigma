import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { mxGraph, mxEvent, mxCompactTreeLayout } from "mxgraph-js";
import Toolbar from "./components/Toolbar";
import ContextMenu from "./components/Contextmenu";

export default class GraphProfiler extends Component {
  state = {
    graphObj: null,
    isFullScreen: false,
    popupProfile: null,
  };

  componentDidMount() {
    this.LoadGraph();
  }

  selectionChange = (sender, evt) => {};

  /**
   * LoadGraph: Init function of mxGraph
   *
   * This function contains steps to init a mxGraph
   */
  LoadGraph = () => {
    // 1. Init core vars, prepare graph and layout
    let container = ReactDOM.findDOMNode(this.refs.divGraph);
    const graph = new mxGraph(container);
    const layout = new mxCompactTreeLayout(graph, false);

    // 2. Disable native contextmenu
    mxEvent.disableContextMenu(container);

    // 3. Init other components related to graph, add change listerner
    graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionChange);

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
          />
          <div className="cont-graphprofiler-toolbar-root">
            <Toolbar
              graphObj={this.state.graphObj}
              onFullScreenSwitch={this.handleFullScreenSwitch}
              isFullScreen={this.state.isFullScreen}
            />
          </div>
          <div className="container" ref="divGraph" />
        </div>
      </div>
    );
  }
}
