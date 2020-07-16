/**
 * gprofVertexV1 - Graph Profiler Model Add-on for vertex
 *
 * .version - Model Version
 * .profile
 *  .privilege - Privilege of module
 *  .parentId - Parent vertex ID
 *  .createdTime - Vertex, Edge - Creation time
 *  .modifiedTime - Vertex, Edge - Modified time
 *  .basics
 *    .isOpenSource - Is module open source
 *    .isSelfDesign - Is module self designed
 *    .isSelfImpl - Is module self implemented
 *    .isSelfCfg - Is module self configured
 *    .isSecurityFeature - Is module contains security feature
 *    .isOutsideBorder - Is module an outside border
 *    .isDefaultCfgSecure - Is module configured as default secured
 *  .assets
 *    .storesSensitiveInfo - Is module stores sensitive info
 *    .processesSensitiveInfo - Is processes stores sensitive info
 *    .datastoreLocation
 *      .isStoredInMemory - Is sensitive info stored in memory
 *      .isStoredInStorage - Is sensitive info stored in storage
 *  .failsafe
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
  profile: {
    privilege: 0,
    parentId: "",
    createdTime: 1000000000000,
    modifiedTime: 1000000000000,
    basics: {
      isOpenSource: false,
      isSelfDesign: false,
      isSelfImpl: false,
      isSelfCfg: false,
      isSecurityFeature: false,
      isOutsideBorder: false
    },
    assets: {
      storesSensitiveInfo: false,
      processesSensitiveInfo: false,
      datastoreLocation: {
        isStoredInMemory: false,
        isStoredInStorage: false
      }
    },
    failsafe: {
      withModuleCE: false,
      withModuleUE: false,
      withModuleFE: false,
      withModuleNE: false,
      descModuleCE: "No Error Here",
      descModuleUE: "No Error Here",
      descModuleFE: "No Error Here",
      descModuleNE: "No Error Here",
      withParentCE: false,
      withParentUE: false,
      withParentFE: false,
      withParentNE: false,
      descParentCE: "No Parent Error Here",
      descParentUE: "No Parent Error Here",
      descParentFE: "No Parent Error Here",
      descParentNE: "No Parent Error Here"
    }
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
  gprof: {
    vertex: gprofVertexV1
  },
  getCellType,
};
