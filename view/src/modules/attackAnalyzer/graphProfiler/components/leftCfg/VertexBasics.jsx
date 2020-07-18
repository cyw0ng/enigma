import React from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import "./VertexBasics.css";

class VertexBasics extends React.Component {
  lpanelTabList = [
    {
      id: "vertex-name",
      label: "Vertex Name",
      componentCb: (gprof) => <span>{gprof.value}</span>,
    },
    {
      id: "project-name",
      label: "Project Name",
      componentCb: (gprof) => <span>TBD</span>,
    },
    {
      id: "vertex-project-id",
      label: "Vertex/Project ID",
      componentCb: (gprof) => <span>TBD</span>,
    },
    {
      id: "vertex-created-time",
      label: "Vertex Created Time",
      componentCb: (gprof) => (
        <span>{new Date(gprof.createdTime).toISOString()}</span>
      ),
    },
    {
      id: "vertex-modified-time",
      label: "Vertex Last Modified Time",
      componentCb: (gprof) => (
        <span>
          {gprof.modifiedTime === 0
            ? "N/A"
            : new Date(gprof.modifiedTime).toISOString()}
        </span>
      ),
    },
    {
      id: "basics-modified-time",
      label: "Basics Last Modified Time",
      componentCb: (gprof) => (
        <span>
          {gprof.modifiedTime === 0
            ? "N/A"
            : new Date(gprof.modifiedTime).toISOString()}
        </span>
      ),
    },
    {
      id: "basics-is-opensource",
      label: "Is Module Open Source",
      componentCb: (gprof) =>
        this.getDefaultSwitchItem(gprof, "profile.basics.isOpenSource"),
    },
    {
      id: "basics-is-selfdesign",
      label: "Is Module Designed By Owner",
      componentCb: (gprof) =>
        this.getDefaultSwitchItem(gprof, "profile.basics.isSelfDesign"),
    },
    {
      id: "basics-is-selfimpl",
      label: "Is Module Self Implemented",
      componentCb: (gprof) =>
        this.getDefaultSwitchItem(gprof, "profile.basics.isSelfImpl"),
    },
    {
      id: "basics-is-selfcfg",
      label: "Is Module Self Configured",
      componentCb: (gprof) =>
        this.getDefaultSwitchItem(gprof, "profile.basics.isSelfCfg"),
    },
    {
      id: "basics-is-security-feature",
      label: "Is Module Represents a Security Feature",
      componentCb: (gprof) =>
        this.getDefaultSwitchItem(gprof, "profile.basics.isSecurityFeature"),
    },
    {
      id: "basics-is-outside-border",
      label: "Is Module Stands as an Outside Border",
      componentCb: (gprof) =>
        this.getDefaultSwitchItem(gprof, "profile.basics.isOutsideBorder"),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      originalGProf: this.props.gprof,
      gprof: this.props.gprof,
    };
  }

  getDefaultSwitchItem = (gprof, path) => {
    return (
      <Switch
        size="small"
        checked={this.getCheckedState(gprof, path)}
        onChange={(evt) => this.handleSwitchChange(evt, gprof, path)}
      />
    );
  };

  handleSwitchChange = (evt, gprof, path) => {
    const checkedState = evt.target.checked;

    /**
     * TBD: Need a more graceful solution of reflection
     */
    if (path === "profile.basics.isOpenSource") {
      gprof.profile.basics.isOpenSource = checkedState;
    } else if (path === "profile.basics.isSelfDesign") {
      gprof.profile.basics.isSelfDesign = checkedState;
    } else if (path === "profile.basics.isSelfImpl") {
      gprof.profile.basics.isSelfImpl = checkedState;
    } else if (path === "profile.basics.isSelfCfg") {
      gprof.profile.basics.isSelfCfg = checkedState;
    } else if (path === "profile.basics.isSecurityFeature") {
      gprof.profile.basics.isSecurityFeature = checkedState;
    } else if (path === "profile.basics.isOutsideBorder") {
      gprof.profile.basics.isOutsideBorder = checkedState;
    }

    this.setState({ gprof });
  };

  onSaveUpdateGprof = () => {
    this.props.updateGprof(this.state.gprof);
  };

  getCheckedState = (gprof, path) => {
    let pathList = path.split(".");

    let cursor = gprof;
    while (pathList.length !== 0) {
      let node = pathList.shift(1);
      if (pathList.length === 0) {
        return cursor[node];
      } else {
        cursor = cursor[node];
      }
    }
  };

  render() {
    let gprof = this.state.gprof;
    if (gprof == null) {
      return null;
    }

    return (
      <div className={"cont-gprof-lpanel-vbasics"}>
        {this.lpanelTabList.map((item) => (
          <div className={"cont-gprof-lpanel-dataitem"}>
            <span className={"cont-gprof-lpanel-datalabel"}>{item.label}</span>{" "}
            {item.componentCb(gprof)}
          </div>
        ))}
        <div className={"cont-gprof-lpanel-savebtn"}>
          <Button variant="outlined" onClick={this.onSaveUpdateGprof}>
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

export default VertexBasics;
