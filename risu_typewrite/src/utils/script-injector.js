import { EXTERNAL_SCRIPTS } from '../constants.js';

export function injectScripts() {
  EXTERNAL_SCRIPTS.forEach((scriptConfig) => {
    const existingScript = document.querySelector(
      `script[src="${scriptConfig.src}"]`
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = scriptConfig.src;
    script.type = "text/javascript";

    document.body.appendChild(script);
  });
}
