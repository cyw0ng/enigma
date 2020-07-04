import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import http from "../../utils/rest/http";

export default class DataDashBoard extends React.Component {
  state = {
    metrics: [],
  };

  componentDidMount() {
    this.getCurrentCirclInfo();
  }

  getCurrentCirclInfo() {
    http.get("/rest/v1/cve-query/circl/info").then(({ data }) => {
      for (const [key, value] of Object.entries(data.payload)) {
        if (value.last_update) {
          this.state.metrics.push({
            metric: "CirclInfo: " + key,
            value: value.size,
            origin: "CirclInfo",
            updateDate: value.last_update,
            id: "CirclInfo-" + key,
          });
        }
      }
      this.setState({ circlInfo: data.payload });
    });
  }

  render() {
    if (this.state.metrics.length === 0) {
      return <div>Preparing CirclInfo data...</div>;
    }
    return (
      <div>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Metric Field</TableCell>
                <TableCell align="right">Metric Value</TableCell>
                <TableCell align="right">Refresh Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.metrics.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.metric}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  <TableCell align="right">{row.updateDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
