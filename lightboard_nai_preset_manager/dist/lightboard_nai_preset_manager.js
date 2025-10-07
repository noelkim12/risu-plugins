//@name Lightboard NAI Preset Manager_v0.1
//@display-name Lightboard NAI Preset Manager_v0.1
//@version 0.1
//@description Lightboard NAI Preset Manager for RISU AI
const PLUGIN_NAME = "LIGHTBOARD NAI PRESET MANAGER";
const PLUGIN_VERSION = "v0.1";
const pluginApis = globalThis.__pluginApis__;
const risuAPI = {
  risuFetch: pluginApis.risuFetch,
  nativeFetch: pluginApis.nativeFetch,
  getArg: pluginApis.getArg,
  getChar: pluginApis.getChar,
  setChar: pluginApis.setChar,
  addProvider: pluginApis.addProvider,
  addRisuScriptHandler: pluginApis.addRisuScriptHandler,
  removeRisuScriptHandler: pluginApis.removeRisuScriptHandler,
  addRisuReplacer: pluginApis.addRisuReplacer,
  removeRisuReplacer: pluginApis.removeRisuReplacer,
  onUnload: pluginApis.onUnload,
  setArg: pluginApis.setArg,
  getDatabase: null,
};

let accepted = false;

{
  try {
    risuAPI.getDatabase = eval("getDatabase");
    globalThis.__pluginApis__.getDatabase = risuAPI.getDatabase;
    accepted = true;
  } catch (error) {
    console.log("[RisuAPI] Failed to add getDatabase:", error);
  }
}

if (!accepted) return;

const RISU_MODULES = risuAPI.getDatabase().modules;
const ALLOWED_NAMESPACE_ARRAY = ["lightboard-NAI", "lightboard-WAN"];
const observer = null;
let LB_NAI_MODULE_IDX = -1;
let LB_NAI_MODULE = null;

MODULES.forEach((_m, _mIdx) => {
  if (ALLOWED_NAMESPACE_ARRAY.includes(_m.namespace)) {
    if (_m.namespace === "lightboard-NAI") {
      LB_NAI_MODULE_IDX = _mIdx;
      LB_NAI_MODULE = _m;
    }
  }
});

if (LB_NAI_MODULE_IDX === -1) {
  console.log("[Lightboard NAI Preset Editor] Lightboard NAI module not found");
  return;
}

function attachButton() {
  let burgerEl = document.querySelector("div.absolute.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md");
  if ( burgerEl && !burgerEl.classList.contains("lnpe-button-appended") ) {

    burgerEl.classList.add("lnpe-botton-appended");
  }
}

function startObserver() {
  if (observer) observer.disconnect();
  observer = new MutationObserver(() => setTimeout(attachButton, 500));
  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(attachButton, 500);
}

risuAPI.onUnload(() => {
  if (observer) observer.disconnect();
  console.log(`${PLUGIN_NAME} 플러그인이 언로드되었습니다.`);
});
