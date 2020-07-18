import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import "./LeftPanel.css";
import gprof from "../model/gprof";
import VertexAsset from "./leftCfg/VertexAsset";
import VertexBasics from "./leftCfg/VertexBasics";
import VertexPrivilege from "./leftCfg/VertexPrivilege";

class LeftPanel extends React.Component {
  state = {
    currentTab: 0,
  };

  tabConfig = [
    {
      tabId: "basics-vertex",
      label: "Basics",
      isTabShowCb: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      componentCb: (cell) => (
        <VertexBasics cell={cell} updateCell={this.props.updateCell} />
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
      </div>
    );
  }
}

export default LeftPanel;
