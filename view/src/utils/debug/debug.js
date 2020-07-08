const isDebug =
  process && process.env && process.env.NODE_ENV === "development";
const runIfDebug = (func) => (isDebug ? func() : "");
const init = () => {
  if (isDebug) {
    console.warn("Enigma runs in Debug mode");
    if (window.enigma_debug == null) {
      console.warn("Enigma debug interface registered on window.enigma_debug");
      window.enigma_debug = EnigmaDebug;
    }
  }
};

const EnigmaDebug = {
  isDebug,
  runIfDebug,
  init,
};

export default EnigmaDebug;
