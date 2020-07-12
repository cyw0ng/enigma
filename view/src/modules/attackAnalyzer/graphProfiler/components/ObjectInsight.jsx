import React from "react";

export default class ObjectInsight extends React.Component {
  render() {
    let graphObj = this.props.graphObj;
    let targetCell = null;
    let insightJSX = null;

    // TBD: Since the onject invoke line is too long
    // Use try-catch to get the status actively
    try {
      targetCell = graphObj.graph.view.states.map[this.props.mxObjectIdFocused];
      if (targetCell != null) {
        let ObjType = "";
        if (targetCell.cell.vertex) {
          ObjType = "Entity";
        }
        if (targetCell.cell.edge) {
          ObjType = "Flow";
        }

        insightJSX = (
          <div>
            {targetCell.cell.value}{" "}
            <span className="cont-obj-insight-objtype">{ObjType}</span>
          </div>
        );
      }
    } catch {
      insightJSX = null;
    }

    return (
      <div
        className={
          "cont-obj-insight-root" +
          (insightJSX == null ? "" : " cont-obj-insight-dimmed")
        }
      >
        {insightJSX}
      </div>
    );
  }
}
