import React from "react";
import ObjectInsight from "./ObjectInsight";

import "./RightPanel.css";

export default class RightPanel extends React.Component {
  render() {
    return (
      <div className="cont-gprof-rpanel-root">
        <ObjectInsight
          mxObjectIdFocused={this.props.mxObjectIdFocused}
          graphObj={this.props.graphObj}
        />
      </div>
    );
  }
}
