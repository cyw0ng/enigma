import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";

export default class Toolbar extends React.Component {
  state = {
    btns: [
      {
        id: "zoom-in",
        icon: <ZoomInIcon fontSize="small" />,
        onClickHandler: (event) => this.onZoomHandler("in"),
        disabled: false,
      },
      {
        id: "zoom-out",
        icon: <ZoomOutIcon fontSize="small" />,
        onClickHandler: (event) => this.onZoomHandler("out"),
        disabled: false,
      },
      {
        id: "zoom-actual",
        icon: <SettingsBackupRestoreIcon fontSize="small" />,
        onClickHandler: (event) => this.onZoomHandler("actual"),
        disabled: true,
      },
    ],
  };

  onZoomHandler = (status) => {
    switch (status) {
      case "in":
        this.props.graphObj.graph.zoomIn();
        break;
      case "out":
        this.props.graphObj.graph.zoomOut();
        break;
      case "actual":
        if (this.props.graphObj.graph.view.scale !== 1) {
          this.props.graphObj.graph.zoomActual();
        }
    }

    let zoomActualIndex = this.state.btns.findIndex(
      (btn) => btn.id === "zoom-actual"
    );
    let isCurrentDisabled = this.state.btns[zoomActualIndex].disabled;
    let updateBtns = Array.from(this.state.btns);
    let newDisabledValue = this.props.graphObj.graph.view.scale === 1;
    if (isCurrentDisabled !== newDisabledValue) {
      updateBtns[zoomActualIndex].disabled = newDisabledValue;
      this.setState({ btns: updateBtns });
    }
  };
  render() {
    if (this.props.graphObj == null) {
      return null;
    }

    console.log(this.props.graphObj);

    return (
      <div>
        {this.state.btns.map((btn) => (
          <IconButton disabled={btn.disabled} onClick={btn.onClickHandler}>
            {btn.icon}
          </IconButton>
        ))}
      </div>
    );
  }
}
