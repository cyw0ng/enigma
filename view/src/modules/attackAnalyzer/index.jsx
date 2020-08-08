import React from "react";
import GraphProfiler from "./graphProfiler/index.jsx";
import ProjectPanel from "./projectPanel/index.jsx";
import http from "../../utils/rest/http";

export default class AttackAnalyzer extends React.Component {
  state = {
    onProjectPanel: true,
    projectId: "",
    projectList: [],
  };

  handleProjectPhaseSwitch = () => {
    this.setState({ onProjectPanel: true, projectList: [] });
  };

  handleProjectIntro = (evt, id) => {
    this.setState({ onProjectPanel: false, projectId: id });
  };

  componentDidMount() {
    http.get("/rest/v1/gprof/project/getall").then(({ data }) => {
      if (data.payload && data.payload.length >= 0) {
        this.setState({ projectList: data.payload });
      }
    });
  }

  render() {
    return (
      <div>
        {this.state.onProjectPanel ? (
          <ProjectPanel
            projectList={this.state.projectList}
            handleProjectIntro={this.handleProjectIntro}
          />
        ) : (
          <GraphProfiler ret2projectHandler={this.handleProjectPhaseSwitch} />
        )}
      </div>
    );
  }
}
