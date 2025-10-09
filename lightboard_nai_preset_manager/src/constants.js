export const PLUGIN_NAME = "Lightboard NAI Preset Manager";
export const PLUGIN_VERSION = "0.3";
export const ALLOWED_NAMESPACE_ARRAY = ["lightboard-NAI", "lightboard-WAN"];
export const LNPM_BUTTON_CLASSNAME = "lnpm-button-appended";

export const EXTERNAL_SCRIPTS = [
  {
    src: "https://cdn.jsdelivr.net/npm/idb@8/build/umd.js",
    global: "idb"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js",
    global: "imageCompression"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/winbox@0.2.82/dist/winbox.bundle.min.js",
    global: "WinBox"
  }
];
