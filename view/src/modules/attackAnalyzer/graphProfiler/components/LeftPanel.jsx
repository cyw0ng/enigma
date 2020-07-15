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
      isTabShow: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      component: <VertexBasics />,
    },
    {
      tabId: "assets-vertex",
      label: "Asset",
      isTabShow: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      component: <VertexAsset />,
    },
    {
      tabId: "assets-privilege",
      label: "Privilege",
      isTabShow: (cell) => ["vertex"].indexOf(gprof.getCellType(cell)) > -1,
      component: <VertexPrivilege />,
    },
  ];
  handleChange = (event, newTabID) => {
    this.setState({ currentTab: newTabID });
  };
  render() {
    const tabs = this.tabConfig.filter((tab) =>
      tab.isTabShow(this.props.targetCell)
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
          {tabs[this.state.currentTab].component}
        </div>
      </div>
    );
  }
}

export default LeftPanel;
