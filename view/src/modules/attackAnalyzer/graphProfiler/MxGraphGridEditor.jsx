import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./mxgraph.css";
import { mxGraph, mxUtils, mxEvent, mxCompactTreeLayout } from "mxgraph-js";
import JsonCodec from "./JsonCodec";

class mxGraphGridAreaEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: {},
      layout: {},
    };
  }

  componentDidMount() {
    this.LoadGraph();
  }

  selectionChange = (sender, evt) => {
    // console.log(sender)
  };

  initToolbar = () => {
    const { graph } = this.state;
    // 放大按钮
    var toolbar = ReactDOM.findDOMNode(this.refs.toolbar);
    toolbar.appendChild(
      mxUtils.button("zoom(+)", function (evt) {
        graph.zoomIn();
      })
    );
    // 缩小按钮
    toolbar.appendChild(
      mxUtils.button("zoom(-)", function (evt) {
        graph.zoomOut();
      })
    );
  };

  LoadGraph = (data) => {
    let that = this;
    var container = ReactDOM.findDOMNode(this.refs.divGraph);
    var graph = new mxGraph(container);
    this.setState(
      {
        graph: graph,
      },
      () => {
        // layout
        const layout = new mxCompactTreeLayout(graph, false);
        this.setState({ layout });
        this.initToolbar();
        var parent = graph.getDefaultParent();

        // Adds cells to the model in a single step
        graph.getModel().beginUpdate();
        var v1 = graph.insertVertex(parent, null, "Hello,", 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, null, "World!", 200, 150, 80, 30);
        graph.insertEdge(parent, null, "", v1, v2);
        // Updates the display
        graph.getModel().endUpdate();
      }
    );
    // Disables the built-in context menu
    mxEvent.disableContextMenu(container);
    // Trigger event after selection
    graph.getSelectionModel().addListener(mxEvent.CHANGE, this.selectionChange);

    graph.getModel().addListener("change", function () {
      const jsonNodes = { graph: JsonCodec.decode(graph.getModel()) };
      let jsonStr = JsonCodec.stringifyWithoutCircular(jsonNodes);
      console.log(jsonStr);
      that.setState({ json: jsonStr });
    });
  };

  render() {
    return (
      <div>
        <div className="toolbar" ref="toolbar" />
        <div className="container-wrapper">
          <div className="container" ref="divGraph" />
        </div>
        <div className="changeInput" style={{ zIndex: 10 }} />
      </div>
    );
  }
}

export default mxGraphGridAreaEditor;
