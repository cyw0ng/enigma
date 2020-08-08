import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  mxGraph,
  mxEvent,
  mxCompactTreeLayout,
  mxConstants,
  mxGraphHandler,
} from "mxgraph-js";
import { withSnackbar } from "notistack";
import Toolbar from "./components/Toolbar";
import ContextMenu from "./components/Contextmenu";
import RightPanel from "./components/RightPanel";
import validation from "./utils/validation";
import CircularProgress from "@material-ui/core/CircularProgress";
import LeftPanel from "./components/LeftPanel";
import graphOps from "./utils/graphOps";
import md5 from "md5";

/**
 * Main class for Graph Profiler Object
 */
class GraphProfiler extends Component {
  state = {
    graphObj: null,
    isFullScreen: false,
    popupProfile: null,
    mxObjectIdFocused: "",
    onValidation: false,
    cellForDetailsCfg: null,
    newFlowStartProfile: null,
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
        if (this.state.newFlowStartProfile != null) {
          const graph = this.state.graphObj.graph;
          const cellStart = this.state.newFlowStartProfile;
          const cellEnd = removedEvt;

          if (graphOps.isEdgeExistBetweenCells(graph, cellStart, cellEnd)) {
            this.props.enqueueSnackbar("Exist edge between vertex", {
              autoHideDuration: 5000,
            });
          } else if (
            graphOps.addEdgeBetweenCells(graph, cellStart, cellEnd) == null
          ) {
            this.props.enqueueSnackbar("Cannot add edge between vertex group", {
              autoHideDuration: 5000,
            });
          }
          this.setState({ newFlowStartProfile: null, popupProfile: null });
        } else {
          this.setState({ mxObjectIdFocused: removedEvt.mxObjectId });
        }
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
    mxGraphHandler.prototype.guidesEnabled = true;
    // graph.addListener(mxEvent.CLICK, this.selectionChange);

    // 4. Set default colors
    mxConstants.STYLE_FILLCOLOR = "white";
    mxConstants.STYLE_FONTCOLOR = "black";

    // 5. Add change hooked listener
    graph.getModel().addListener("endUpdate", (evt) => {
      graphOps.graphVerify(graph, true);
      if (this.state.popupProfile != null) {
        this.setState({ popupProfile: null });
      }
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

    // 6. mount graph & layout to object
    this.setState(
      {
        graphObj: {
          graph,
          layout,
        },
      },
      () => {
        // 7. Deploy graph ondemand
        // this.loadGraphDemo();
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

  handleAddNewEdge = (startCell) => {
    this.setState({ newFlowStartProfile: startCell });
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

  handleGraphValidation = () => {
    this.setState({ onValidation: true }, () => {
      if (!validation.validateGraph(this.state.graphObj)) {
      }
      this.setState({ onValidation: false });
    });
  };

  handleGraphSave = () => {
    const graphJSON = graphOps.generateSaveGraphJSON(this.state.graphObj.graph);

    graphJSON.projectId = this.props.projectId;
    graphJSON.modifiedTime = new Date().valueOf();
    graphJSON.graphDigest = md5(graphJSON.graph);

    debugger;
  };

  handleCellDetails = (cell) => {
    this.setState({ cellForDetailsCfg: cell, popupProfile: null });
  };

  onCloseLpanel = () => {
    this.setState({ cellForDetailsCfg: null });
  };

  updateGprofForID = (gprof, id) => {
    let graph = this.state.graphObj.graph;
    let model = graph.getModel();
    debugger;
    model.beginUpdate();
    model.cells[id] = Object.assign(model.cells[id], { gprof });
    model.endUpdate();
    debugger;
  };

  render() {
    return (
      <div>
        <div className="cont-graphprofiler-root" ref="attackProfiler">
          {this.state.onValidation ? (
            <div className="cont-gprof-validation-mask">
              <CircularProgress className="cont-gprof-validation-spinner" />
              <div className="cont-gprof-validation-prompt">Validating...</div>
            </div>
          ) : null}
          <ContextMenu
            popupProfile={this.state.popupProfile}
            onCloseContextmenu={this.handleCloseContextmenu}
            onVertexRename={this.handleVertexRename}
            handleCellDetails={this.handleCellDetails}
            handleAddNewEdge={this.handleAddNewEdge}
          />
          <div className="cont-graphprofiler-toolbar-root">
            <Toolbar
              graphObj={this.state.graphObj}
              onFullScreenSwitch={this.handleFullScreenSwitch}
              onGraphValidationHandler={this.handleGraphValidation}
              onGraphSaveHandler={this.handleGraphSave}
              isFullScreen={this.state.isFullScreen}
              ret2projectHandler={this.props.ret2projectHandler}
            />
          </div>
          <div className="cont-graphprofiler-rpanel-root">
            <RightPanel
              mxObjectIdFocused={this.state.mxObjectIdFocused}
              graphObj={this.state.graphObj}
            />
          </div>

          {this.state.cellForDetailsCfg != null ? (
            <div className="cont-graphprofiler-lpanel-root">
              <LeftPanel
                targetCell={this.state.cellForDetailsCfg}
                updateGprofForID={this.updateGprofForID}
                onCloseLpanel={this.onCloseLpanel}
              />
            </div>
          ) : null}

          <div
            className="cont-graphprofiler-graph-container"
            ref="divGraph"
            onClick={this.handleCloseContextmenu}
          />
        </div>
      </div>
    );
  }
}

export default withSnackbar(GraphProfiler);
