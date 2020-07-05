import React from "react";
import { withSnackbar } from "notistack";

class CAPECEnum extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.enqueueSnackbar("CAPEC", {
      autoHideDuration: 5000,
    });
  }

  render() {
    return <div>CAPEC</div>;
  }
}

export default withSnackbar(CAPECEnum);
