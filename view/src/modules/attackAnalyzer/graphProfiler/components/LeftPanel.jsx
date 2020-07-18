import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import "./LeftPanel.css";
import gprof from "../model/gprof";
import VertexAsset from "./leftCfg/VertexAsset";
import VertexBasics from "./leftCfg/VertexBasics";
import VertexPrivilege from "./leftCfg/VertexPrivilege";

class LeftPanel extends React.Component {
  state = {
    currentTab: 0,
    gprof: null,
  };

  tabConfig = [
    {
      tabId: "basics-vertex",
      label: "Basics",
      isTabShowCb: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      componentCb: (cell) => (
        <VertexBasics
          gprof={this.state.gprof}
          updateGprof={this.onUpdateGprof}
          onCloseLpanel={this.props.onCloseLpanel}
          updateGprofSnapshot={this.updateGprofSnapshot}
        />
      ),
    },
    {
      tabId: "assets-vertex",
      label: "Asset",
      isTabShowCb: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      componentCb: (cell) => <VertexAsset cell={cell} />,
    },
    {
      tabId: "assets-privilege",
      label: "Privilege",
      isTabShowCb: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      componentCb: (cell) => <VertexPrivilege cell={cell} />,
    },
  ];

  handleChange = (event, newTabID) => {
    this.setState({ currentTab: newTabID });
  };

  onUpdateGprof = (gprof) => {
    this.props.updateGprofForID(this.state.gprof, this.props.targetCell.id);
  };

  updateGprofSnapshot = (gprof) => {
    this.setState({ gprof });
  };

  componentWillMount() {
    this.setState({ gprof: this.props.targetCell.gprof });
  }

  render() {
    const tabs = this.tabConfig.filter((tab) =>
      tab.isTabShowCb(this.props.targetCell)
    );

    return (
      <div className={"cont-gprof-lpanel-main"}>
        <Tabs
          orientation="vertical"
          className="cont-gprof-lpanel-tabs-root"
          value={this.state.currentTab}
          onChange={this.handleChange}
        >
          {tabs.map((tab) => (
            <Tab label={tab.label} />
          ))}
        </Tabs>
        <div className={"cont-gprof-lpanel-content"}>
          {tabs[this.state.currentTab].componentCb(this.props.targetCell)}
        </div>
        <div className={"cont-gprof-lpanel-help"}>
          <div>Help</div>
        </div>
        <div className={"cont-gprof-lpanel-savebtns"}>
          <Button variant="outlined" onClick={this.onUpdateGprof}>
            Save
          </Button>
          <Button variant="outlined" onClick={this.props.onCloseLpanel}>
            Close
          </Button>
        </div>
      </div>
    );
  }
}

export default LeftPanel;
