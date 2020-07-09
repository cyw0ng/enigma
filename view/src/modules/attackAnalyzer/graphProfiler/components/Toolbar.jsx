import React from "react";
import IconButton from "@material-ui/core/IconButton";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitRoundedIcon from "@material-ui/icons/FullscreenExitRounded";

export default class Toolbar extends React.Component {
  state = {
    btns: [],
  };

  componentWillReceiveProps() {
    this.updateBtns();
  }

  updateBtns = () => {
    this.setState({
      btns: [
        {
          id: "zoom-in",
          iconCallback: (props) => <ZoomInIcon fontSize="small" />,
          onClickHandler: (event) => this.onZoomHandler("in"),
          disabled: false,
        },
        {
          id: "zoom-out",
          iconCallback: (props) => <ZoomOutIcon fontSize="small" />,
          onClickHandler: (event) => this.onZoomHandler("out"),
          disabled: false,
        },
        {
          id: "zoom-actual",
          iconCallback: (props) => (
            <SettingsBackupRestoreIcon fontSize="small" />
          ),
          onClickHandler: (event) => this.onZoomHandler("actual"),
          disabled: true,
        },
        {
          id: "switch-screens",
          iconCallback: (props) => {
            return !this.props.isFullScreen ? (
              <FullscreenIcon fontSize="small" />
            ) : (
              <FullscreenExitRoundedIcon fontSize="small" />
            );
          },
          onClickHandler: (event) => this.props.onFullScreenSwitch(),
          disabled: false,
        },
      ],
    });
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
        break;
      default:
        break;
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
            {btn.iconCallback(this.props)}
          </IconButton>
        ))}
      </div>
    );
  }
}
