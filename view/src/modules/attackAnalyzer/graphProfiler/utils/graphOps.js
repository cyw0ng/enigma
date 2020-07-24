/**
 * addEdgeBetweenCells - Add edge from cell1 to cell2
 *
 * @param {*} graph - graph
 * @param {*} cell1 - starting vertex
 * @param {*} cell2 - end vertex
 *
 * @returns edge object if success, null if failed
 */
const addEdgeBetweenCells = (graph, cell1, cell2) => {
  let newEdge = null;

  try {
    const parent = graph.getDefaultParent();

    graph.getModel().beginUpdate();
    newEdge = graph.insertEdge(parent, null, "", cell1, cell2);
    graph.getModel().endUpdate();
  } catch (e) {
    newEdge = null;
  }

  return newEdge;
};

/**
 * isEdgeExistBetweenCells - Add edge if not exist from cell1 to cell2
 *
 * @param {*} graph - graph
 * @param {*} cell1 - starting vertex
 * @param {*} cell2 - end vertex
 *
 * @returns edge object if success, null if failed
 */
const isEdgeExistBetweenCells = (graph, cell1, cell2) => {
  try {
    return graph.getModel().getEdgesBetween(cell1, cell2).length > 0;
  } catch (e) {
    return false;
  }
};

export default {
  addEdgeBetweenCells,
  isEdgeExistBetweenCells,
};
