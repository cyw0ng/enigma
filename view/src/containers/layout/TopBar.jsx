import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default class TopBar extends React.Component {
  onTitleClickHandler = () => {
    this.props.backToFrontpage(-1);
  };

  render() {
    return (
      <div className="cont-topbar-root">
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              className="cont-backfront-btn"
              variant="h6"
              onClick={this.onTitleClickHandler}
            >
              Enigma
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
