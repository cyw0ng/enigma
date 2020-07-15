const gprofV1 = {
  version: 1,
  profile: {
    privilege: 5,
  },
};

const getCellType = (cell) => {
  if (cell == null) {
    return "mask";
  }

  if (cell.vertex) {
    return "vertex";
  }

  if (cell.edge) {
    return "edge";
  }
};

export default {
  gprof: gprofV1,
  getCellType,
};
