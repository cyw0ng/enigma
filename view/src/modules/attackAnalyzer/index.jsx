import React from "react";
import GraphProfiler from "./graphProfiler/MxGraphGridEditor";

export default class AttackAnalyzer extends React.Component {
  render() {
    console.log(process.env);
    return (
      <div>
        Attack
        <GraphProfiler />
      </div>
    );
  }
}
