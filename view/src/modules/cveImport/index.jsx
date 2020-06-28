import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import http from "../../utils/rest/http";

import "./index.css";

export default class CVEImport extends React.Component {
  state = {
    searchId: "",
  };

  searchKeyClickHandler = () => {
    http.get("/rest/v1/cve-query/cve/v1?id=" + this.state.searchId);
    console.log(this.state.searchId);
  };

  searchIdChangeHandler = (event) => {
    if (event.target.value !== this.state.searchId) {
      this.setState({ searchId: event.target.value });
    }
  };

  render() {
    return (
      <div className="module-cveimport-root">
        <TextField
          label="CVSS ID"
          variant="outlined"
          size="small"
          onChange={this.searchIdChangeHandler}
        />
        <Button
          color="primary"
          variant="contained"
          onClick={this.searchKeyClickHandler}
        >
          Search
        </Button>
      </div>
    );
  }
}
