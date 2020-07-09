import React from "react";
import { withSnackbar } from "notistack";
import http from "../../utils/rest/http";
import echarts from "echarts";
import chartsCAPEC2CWE from "./capec-to-cwe.echarts";
import Draggable from "react-draggable";

import "./index.css";

class CAPECEnum extends React.Component {
  cweIdMap = {};

  state = {
    cweList: null,
    capecList: null,
    fetchedLists: [],
  };

  componentDidMount() {
    this.getCWEListAll();
    this.getCapecListAll();

    this.props.enqueueSnackbar(
      "CAPEC List could be usable only after DB cache ready",
      {
        autoHideDuration: 5000,
      }
    );
  }

  getCWEListAll = () =>
    http.get("/rest/v1/cve-query/cwe/all").then(({ data }) => {
      if (data.code === 0) {
        data.payload.forEach((item) => {
          this.cweIdMap[item.id] = item;
        });
        this.setState({
          cweList: data.payload,
          fetchedLists: [...this.state.fetchedLists, "cweList"],
        });
      }
    });

  getCapecListAll = () =>
    http.get("/rest/v1/cve-query/capec/all").then(({ data }) => {
      if (data.code === 0) {
        this.setState({
          capecList: data.payload,
          fetchedLists: [...this.state.fetchedLists, "capecList"],
        });
      }
    });

  renderCapecToCWE = () => {
    var myChart = echarts.init(
      document.getElementsByClassName("cont-capec-tocwe-echarts")[0]
    );
    this.populateCAPEC2CWEData(chartsCAPEC2CWE);
    myChart.setOption(chartsCAPEC2CWE);
  };

  getCWENameFromID = (id) => {
    return this.cweIdMap[id] ? this.cweIdMap[id].name : "UNKNOWN";
  };

  populateCAPEC2CWEData = (chartsCAPEC2CWE) => {
    const capecSeverity = [
      "",
      "Very Low",
      "Low",
      "Medium",
      "High",
      "Very High",
    ];
    const capecLikelihood = ["", "Low", "Medium", "High"];
    let capecGraphObj = {
      name: "CAPEC",
      children: capecSeverity.map((level) => {
        return {
          name: "Serverity: " + (level.length === 0 ? "Unspecified" : level),
          value: level,
          children: capecLikelihood.map((likely) => {
            return {
              name:
                "Likelihood: " + (likely.length === 0 ? "Unspecified" : likely),
              value: likely,
              children: [],
            };
          }),
        };
      }),
    };

    this.state.capecList.forEach((capecItem) => {
      let childrenList = [];
      capecItem.related_weakness.forEach((id) => {
        if (id.length !== 0) {
          const CWEName = this.getCWENameFromID(id);
          childrenList.push({
            name: "CWE-" + id + ":" + CWEName,
            value: CWEName,
          });
        }
      });
      let severityIndex = capecSeverity.indexOf(capecItem.typical_severity);
      let likelyIndex = capecLikelihood.indexOf(capecItem.likelihood_of_attack);

      if (severityIndex !== -1 && likelyIndex !== -1) {
        capecGraphObj.children[severityIndex].children[
          likelyIndex
        ].children.push({
          name: "CAPEC-" + capecItem.id,
          value: capecItem.name,
          children: childrenList,
          collapsed: true,
        });
      }
    });

    chartsCAPEC2CWE.series[0].data = [capecGraphObj];
  };

  render() {
    if (
      this.state.fetchedLists.findIndex((item) => item === "cweList") > -1 &&
      this.state.fetchedLists.findIndex((item) => item === "capecList") > -1
    ) {
      this.renderCapecToCWE();
    }
    return (
      <div className="cont-capec-root">
        CAPEC
        <Draggable>
          <div className="cont-capec-tocwe-echarts" />
        </Draggable>
      </div>
    );
  }
}

export default withSnackbar(CAPECEnum);
