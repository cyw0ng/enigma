import EnigmaDebug from "../../../../utils/debug/debug";

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

/**
 * graphVerify - Verify graph and normalize ondemand
 * @param {*} graph - graph
 * @param {boolean} doNormalize - do apply normalization on graph
 */
const graphVerify = (graph, doNormalize) => {
  if (EnigmaDebug.isDebug) {
    console.log("[debug] start graphVerify at", new Date().valueOf());
  }

  const allCells = Object.values(graph.model.cells);
  const allVertex = allCells.filter((cell) => cell.vertex);
  const allEdge = allCells.filter((cell) => cell.edge);
  const allGroup = allCells.filter(
    (cell) => cell.children && cell.children.length > 0
  );

  // 1. If two Edge are overlapping, remove the edge between them
  // TBD: find a more optimized solution
  if (allVertex.length >= 2) {
    for (let i = 0; i < allVertex.length; i++) {
      for (let j = 0; j < i; j++) {
        if (__isVertexOverlapping(allVertex[i], allVertex[j])) {
          if (!doNormalize) {
            return false;
          } else {
            __removeEdgeBetweenVertex(
              graph,
              allEdge,
              allVertex[i],
              allVertex[j]
            );
          }
        }
      }
    }
  }

  if (EnigmaDebug.isDebug) {
    console.log("[debug] done graphVerify at", new Date().valueOf());
  }

  return true;
};

/**
 * __isVertexOverlapping - Check is two vertex are overlapping
 *
 * @param {*} vertexA - two vertex to check
 * @param {*} vertexB - two vertex to check
 */
const __isVertexOverlapping = (vertexA, vertexB) => {
  const A = vertexA.geometry;
  const B = vertexB.geometry;
  let xOverlap =
    __isValueInRange(A.x, B.x, B.x + B.width) ||
    __isValueInRange(B.x, A.x, A.x + A.width);

  let yOverlap =
    __isValueInRange(A.y, B.y, B.y + B.height) ||
    __isValueInRange(B.y, A.y, A.y + A.height);

  return xOverlap && yOverlap;
};

/**
 * __removeEdgeBetweenVertex - Remove edge if it exists between two vertex
 *
 * @param {*} graph - graph
 * @param {*} allEdge - edge array
 * @param {*} vertexA - two vertex to check
 * @param {*} vertexB - two vertex to check
 */
const __removeEdgeBetweenVertex = (graph, allEdge, vertexA, vertexB) => {
  let edgesToRemove = [];
  edgesToRemove = __isEdgeBetweenVertex(allEdge, vertexA, vertexB);
  if (edgesToRemove.length > 0) {
    graph.removeCells(edgesToRemove);
  }
};

/**
 * __isEdgeBetweenVertex - Check is edge exists between two vertex
 *
 * @param {*} allEdge - edge array
 * @param {*} vertexA - two vertex to check
 * @param {*} vertexB - two vertex to check
 *
 * @returns edges group between vertex
 */
const __isEdgeBetweenVertex = (allEdge, vertexA, vertexB) => {
  return allEdge.filter((edge) => {
    const tuple = [edge.source.id, edge.target.id];
    return (
      (tuple[0] === vertexA.id && tuple[1] === vertexB.id) ||
      (tuple[1] === vertexA.id && tuple[0] === vertexB.id)
    );
  });
};

/**
 * __isValueInRange - Check whether value is in range
 * @param {*} value - value to check
 * @param {*} min - left boundary
 * @param {*} max - right boundary
 */
const __isValueInRange = (value, min, max) => {
  return value >= min && value <= max;
};

export default {
  addEdgeBetweenCells,
  isEdgeExistBetweenCells,
  graphVerify,
};
