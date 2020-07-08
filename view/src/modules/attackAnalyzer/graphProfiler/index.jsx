import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { mxGraph, mxEvent, mxCompactTreeLayout } from "mxgraph-js";

export default class GraphProfiler extends Component {
  graph = null;
  layout = null;

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

    // 4. mount graph & layout to object
    this.graph = graph;
    this.layout = layout;

    // 5. Deploy graph ondemand
    this.loadGraphDemo();
  };

  loadGraphDemo = () => {
    let graph = this.graph;
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
        <div className="container-wrapper">
          <div className="container" ref="divGraph" />
        </div>
      </div>
    );
  }
}
