/**
 * gprofVertexV1 - Graph Profiler Model Add-on for vertex
 *
 * .version - Model Version
 * .parentId - Parent vertex ID
 * .createdTime - Creation time
 * .modifiedTime - Modified time
 * .profile
 *  .basics
 *    .moduleModifiedTime - Vertex, Edge - Module last modified time
 *    .isOpenSource - Is module open source
 *    .isSelfDesign - Is module self designed
 *    .isSelfImpl - Is module self implemented
 *    .isSelfCfg - Is module self configured
 *    .isSecurityFeature - Is module contains security feature
 *    .isOutsideBorder - Is module an outside border
 *    .isDefaultCfgSecure - Is module configured as default secured
 *  .assets
 *    .moduleModifiedTime - Vertex, Edge - Module last modified time
 *    .storesSensitiveInfo - Is module stores sensitive info
 *    .processesSensitiveInfo - Is processes stores sensitive info
 *    .datastoreLocation
 *      .isStoredInMemory - Is sensitive info stored in memory
 *      .isStoredInStorage - Is sensitive info stored in storage
 *  .failsafe
 *    .moduleModifiedTime - Vertex, Edge - Module last modified time
 *    .withModuleCE - Module contains Correctable Error
 *    .withModuleUE - Module contains Uncorrectable Error
 *    .withModuleFE - Module contains Fatal Error
 *    .withModuleNE - Module contains Non-Fatal Error
 *    .descModuleCE - Description of Correctable Error Scene
 *    .descModuleUE - Description of Uncorrectable Error Scene
 *    .descModuleFE - Description of Fatal Error Scene
 *    .descModuleNE - Description of Non-Fatal Error Scene
 *    .withParentCE - Module triggers parent's Correctable Error
 *    .withParentUE - Module triggers parent's Uncorrectable Error
 *    .withParentFE - Module triggers parent's Fatal Error
 *    .withParentNE - Module triggers parent's Non-Fatal Error
 *    .descParentCE - Description of Module triggered parent's Correctable Error Scene
 *    .descParentUE - Description of Module triggered parent's Uncorrectable Error Scene
 *    .descParentFE - Description of Module triggered parent's Fatal Error Scene
 *    .descParentNE - Description of Module triggered parent's Non-Fatal Error Scene
 */
const gprofVertexV1 = {
  version: 1,
  parentId: "",
  createdTime: 0,
  modifiedTime: 0,
  profile: {
    basics: {
      moduleModifiedTime: 0,
      isOpenSource: false,
      isSelfDesign: false,
      isSelfImpl: false,
      isSelfCfg: false,
      isSecurityFeature: false,
      isOutsideBorder: false,
    },
    assets: {
      moduleModifiedTime: 0,
      storesSensitiveInfo: false,
      processesSensitiveInfo: false,
      datastoreLocation: {
        isStoredInMemory: false,
        isStoredInStorage: false,
      },
    },
    failsafe: {
      moduleModifiedTime: 0,
      withModuleCE: false,
      withModuleUE: false,
      withModuleFE: false,
      withModuleNE: false,
      descModuleCE: "",
      descModuleUE: "",
      descModuleFE: "",
      descModuleNE: "",
      withParentCE: false,
      withParentUE: false,
      withParentFE: false,
      withParentNE: false,
      descParentCE: "",
      descParentUE: "",
      descParentFE: "",
      descParentNE: "",
    },
  },
};

/**
 * vertex - Current Vertex model
 */
const vertex = gprofVertexV1;

const getDefaultVertex = (cell) => {
  let newVertex = JSON.parse(JSON.stringify(vertex));
  newVertex.createdTime = new Date().getTime();

  return newVertex;
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
  gprof: {
    vertex,
  },
  getCellType,
  getDefaultVertex,
};
