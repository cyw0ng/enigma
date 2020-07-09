const isDebug =
  process && process.env && process.env.NODE_ENV === "development";
const runIfDebug = (func) => (isDebug ? func() : "");
const init = () => {
  if (isDebug) {
    console.warn("Enigma runs in Debug mode");
    if (window.enigmaDebug == null) {
      console.warn("Enigma debug interface registered on window.enigmaDebug");
      window.enigmaDebug = EnigmaDebug;
    }
  }
};

const EnigmaDebug = {
  isDebug,
  runIfDebug,
  init,
};

export default EnigmaDebug;
