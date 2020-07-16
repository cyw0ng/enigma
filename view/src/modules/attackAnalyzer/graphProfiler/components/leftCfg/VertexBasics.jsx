import React from "react";
import Switch from "@material-ui/core/Switch";
import "./VertexBasics.css";

class VertexBasics extends React.Component {
  lpanelTabList = [
    {
      id: "vertex-name",
      label: "Vertex Name",
      componentCb: (cell) => <span>{cell.value}</span>,
    },
    {
      id: "project-name",
      label: "Project Name",
      componentCb: (cell) => <span>TBD</span>,
    },
    {
      id: "vertex-project-id",
      label: "Vertex/Project ID",
      componentCb: (cell) => <span>TBD</span>,
    },
    {
      id: "vertex-created-time",
      label: "Vertex Created Time",
      componentCb: (cell) => (
        <span>{new Date(cell.gprof.createdTime).toISOString()}</span>
      ),
    },
    {
      id: "vertex-modified-time",
      label: "Vertex Last Modified Time",
      componentCb: (cell) => (
        <span>
          {cell.gprof.modifiedTime === 0
            ? "N/A"
            : new Date(cell.gprof.modifiedTime).toISOString()}
        </span>
      ),
    },
    {
      id: "basics-modified-time",
      label: "Basics Last Modified Time",
      componentCb: (cell) => <Switch size="small" />,
    },
    {
      id: "basics-is-opensource",
      label: "Is Module Open Source",
      componentCb: (cell) => <Switch size="small" />,
    },
    {
      id: "basics-is-selfdesign",
      label: "Is Module Designed By Owner",
      componentCb: (cell) => <Switch size="small" />,
    },
    {
      id: "basics-is-selfimpl",
      label: "Is Module Self Implemented",
      componentCb: (cell) => <Switch size="small" />,
    },
    {
      id: "basics-is-selfcfg",
      label: "Is Module Self Configured",
      componentCb: (cell) => <Switch size="small" />,
    },
    {
      id: "basics-is-security-feature",
      label: "Is Module Represents a Security Feature",
      componentCb: (cell) => <Switch size="small" />,
    },
    {
      id: "basics-is-outside-border",
      label: "Is Module Stands as an Outside Border",
      componentCb: (cell) => <Switch size="small" />,
    },
  ];

  render() {
    let cell = this.props.cell;
    return (
      <div className={"cont-gprof-lpanel-vbasics"}>
        {this.lpanelTabList.map((item) => (
          <div className={"cont-gprof-lpanel-dataitem"}>
            <span className={"cont-gprof-lpanel-datalabel"}>{item.label}</span>{" "}
            {item.componentCb(cell)}
          </div>
        ))}
      </div>
    );
  }
}

export default VertexBasics;
