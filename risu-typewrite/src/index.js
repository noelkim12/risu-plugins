import {
  PLUGIN_NAME,
  PLUGIN_VERSION,
  LNPM_BUTTON_CLASSNAME,
} from "./constants.js";
import { RisuAPI } from "./core/risu-api.js";
import { ModuleManager } from "./core/module-manager.js";
import { PresetManager } from "./core/preset-manager.js";
import { injectStyles } from "./ui/styles.js";
import { LnpmMenuButton } from "./ui/components/menu-button.js";
import { LnpmToolbar } from "./ui/components/toolbar.js";
import { LnpmList } from "./ui/components/list.js";
import { LnpmFormPage } from "./ui/components/form-page.js";
import { LnpmTabs } from "./ui/components/tabs.js";
import { LnpmPreviewTab } from "./ui/components/preview-tab.js";
import { injectScripts } from "./utils/script-injector.js";

// 메인 애플리케이션 클래스
class LightboardNAIPresetManager {
  constructor() {
    this.risuAPI = null;
    this.observer = null;
    this.rtModuleBox = null;
    this.rtModuleBoxRoot = document.createElement("div");
    this.rtModuleBoxRoot.className = "rt-wrap";
  }

  async initialize() {
    // RisuAPI 초기화
    this.risuAPI = new RisuAPI(globalThis.__pluginApis__);
    const accepted = await this.risuAPI.initialize();

    if (!accepted) {
      console.log(`[${PLUGIN_NAME}] Failed to initialize`);
      return false;
    }

    // UI 초기화
    this.initializeUI();
    this.startObserver();
    this.setupHashListener();

    console.log(`[${PLUGIN_NAME}] plugin loaded`);
    return true;
  }

  initializeUI() {
    // 스타일 주입
    injectStyles();

    // Custom Elements 등록
    const CE = globalThis.customElements || customElements;
    CE.get("lnpm-list") || CE.define("lnpm-list", LnpmList);
    CE.get("lnpm-toolbar") || CE.define("lnpm-toolbar", LnpmToolbar);
    CE.get("lnpm-menu-button") || CE.define("lnpm-menu-button", LnpmMenuButton);
    CE.get("lnpm-form-page") || CE.define("lnpm-form-page", LnpmFormPage);
    CE.get("lnpm-tabs") || CE.define("lnpm-tabs", LnpmTabs);
    CE.get("lnpm-preview-tab") || CE.define("lnpm-preview-tab", LnpmPreviewTab);
  }

  openModuleBox() {
    if (this.rtModuleBox) return;

    const isMobile = window.innerWidth <= 768;
    const winboxConfig = isMobile
      ? {
          title: "LIGHTBOARD NAI 프리셋",
          x: "center",
          y: "center",
          width: "80%",
          height: "80%",
          minwidth: "80%",
          minheight: "80%",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-resize", "no-max", "no-min", "lnpm-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        }
      : {
          title: "Risu Typewrite",
          x: "center",
          y: "center",
          width: Math.min(650, window.innerWidth * 0.9) + "px",
          height: Math.min(650, window.innerHeight * 0.8) + "px",
          minwidth: "320px",
          minheight: "400px",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-max", "no-min", "lnpm-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        };

    this.rtModuleBox = new WinBox(winboxConfig);
    location.hash = "";
    this.renderList();
  }

  renderList() {
    this.rtModuleBoxRoot.innerHTML = "";
    const toolbarEl = document.createElement("lnpm-toolbar");
    toolbarEl.config = {
      title: "프리셋 목록",
    };
    this.rtModuleBoxRoot.appendChild(toolbarEl);
    this.rtModuleBoxRoot.appendChild(null);
  }

  navigate(to) {
    if (location.hash !== `#${to}`) location.hash = to;
    else this.render();
  }

  render() {
    const hash = location.hash.slice(1); // '#' 제거

    if (!hash || hash === "/") {
      this.renderList();
      return;
    }
  }

  setupHashListener() {
    window.addEventListener("hashchange", () => {
      if (this.rtModuleBox) {
        this.render();
      }
    });
  }

  startObserver() {
    if (this.observer) this.observer.disconnect();
    this.observer = new MutationObserver(() => {
      setTimeout(() => this.attachButton(), 100);
    });
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });
    setTimeout(() => this.attachButton(), 500);
  }

  attachButton() {
    let burgerEl = document.querySelector(
      "div.absolute.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md"
    );
    if (burgerEl && !burgerEl.classList.contains(RT_BUTTON_CLASSNAME)) {
      const presetDiv = document.createElement("rt-menu-button");
      burgerEl.addEventListener("click", () => {
        this.openModuleBox();
      });
      burgerEl.appendChild(presetDiv);
      burgerEl.classList.add(RT_BUTTON_CLASSNAME);
    }
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
    console.log(`${PLUGIN_NAME} 언로드`);
  }
}

// 애플리케이션 실행
(async () => {
  // 외부 스크립트 주입
  injectScripts();
  const app = new RisuTypewrite();
  await app.initialize();

  // 언로드 핸들러 등록
  if (globalThis.__pluginApis__?.onUnload) {
    globalThis.__pluginApis__.onUnload(() => {
      app.destroy();
    });
  }
})();
