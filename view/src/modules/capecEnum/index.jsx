import React from "react";
import { withSnackbar } from "notistack";
import http from "../../utils/rest/http";
import echarts from "echarts";
import chartsCAPEC2CWE from "./capec-to-cwe.echarts";

import "./index.css";

class CAPECEnum extends React.Component {
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
      document.getElementById("cont-capec-tocwe-echarts")
    );
    myChart.setOption(chartsCAPEC2CWE);
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
        <div id="cont-capec-tocwe-echarts" />
      </div>
    );
  }
}

export default withSnackbar(CAPECEnum);
