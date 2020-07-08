import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";

export default class Toolbar extends React.Component {
  onZoomInHandler = () => this.props.graphObj.graph.zoomIn();
  onZoomOutHandler = () => this.props.graphObj.graph.zoomOut();
  onZoomActualHandler = () => this.props.graphObj.graph.zoomActual();

  render() {
    if (this.props.graphObj == null) {
      return null;
    }

    console.log(this.props.graphObj);

    return (
      <div>
        <IconButton onClick={this.onZoomInHandler}>
          <ZoomInIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={this.onZoomOutHandler}>
          <ZoomOutIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={this.onZoomActualHandler}>
          <SettingsBackupRestoreIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }
}
