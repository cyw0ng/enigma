import React from "react";
import ObjectInsight from "./ObjectInsight";
import GraphOps from "./GraphOps";

import "./RightPanel.css";

export default class RightPanel extends React.Component {
  render() {
    return (
      <div className="cont-gprof-rpanel-root">
        <GraphOps />
        <ObjectInsight
          mxObjectIdFocused={this.props.mxObjectIdFocused}
          graphObj={this.props.graphObj}
        />
      </div>
    );
  }
}
