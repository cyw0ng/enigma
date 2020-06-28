import React from "react";
import Paper from "@material-ui/core/Paper";
import TopBar from "./TopBar";
import LeftDrawer from "./LeftDrawer";

import "./Layout.css";

export default class Layout extends React.Component {
  render() {
    return (
      <div className="cont-layout-root">
        <TopBar />
        <div className="cont-layout-mainarea">
          <LeftDrawer
            menuConfig={this.props.menuConfig}
            selectMenuIndex={this.props.selectMenuIndex}
          />
          <div className="cont-layout-rightarea">
            <Paper square>{this.props.component}</Paper>
          </div>
        </div>
      </div>
    );
  }
}
