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
    this.moduleManager = null;
    this.presetManager = null;
    this.observer = null;
    this.lbNaiModuleBox = null;
    this.lbNaiModuleBoxRoot = document.createElement("div");
    this.lbNaiModuleBoxRoot.className = "lnpm-wrap";
  }

  async initialize() {
    // RisuAPI 초기화
    this.risuAPI = new RisuAPI(globalThis.__pluginApis__);
    const accepted = await this.risuAPI.initialize();

    if (!accepted) {
      console.log(`[${PLUGIN_NAME}] Failed to initialize`);
      return false;
    }

    // 모듈 매니저 초기화
    this.moduleManager = new ModuleManager(this.risuAPI);
    if (!this.moduleManager.initialize()) {
      console.log(`[${PLUGIN_NAME}] module not found`);
      return false;
    }

    // 프리셋 매니저 초기화
    this.presetManager = new PresetManager(this.moduleManager);
    if (!this.presetManager.initialize()) {
      console.log(`[${PLUGIN_NAME}] Failed to initialize presets`);
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
    if (this.lbNaiModuleBox) return;

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
          mount: this.lbNaiModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-resize", "no-max", "no-min"],
          onclose: () => {
            this.lbNaiModuleBox = null;
            location.hash = "";
          },
        }
      : {
          title: "LIGHTBOARD NAI 프리셋",
          x: "center",
          y: "center",
          width: Math.min(750, window.innerWidth * 0.9) + "px",
          height: Math.min(750, window.innerHeight * 0.8) + "px",
          minwidth: "320px",
          minheight: "400px",
          mount: this.lbNaiModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-max", "no-min"],
          onclose: () => {
            this.lbNaiModuleBox = null;
            location.hash = "";
          },
        };

    this.lbNaiModuleBox = new WinBox(winboxConfig);
    location.hash = "";
    this.renderList();
  }

  renderList() {
    this.lbNaiModuleBoxRoot.innerHTML = "";
    const toolbarEl = document.createElement("lnpm-toolbar");
    toolbarEl.config = {
      title: "프리셋 목록",
    };
    this.lbNaiModuleBoxRoot.appendChild(toolbarEl);

    const LIST_ELEMENT = document.createElement("lnpm-list");
    const presets = this.presetManager.getPresets();
    LIST_ELEMENT.data = {
      presets,
      onNavigate: (id) => this.navigate(`/edit/${id}`),
    };
    this.lbNaiModuleBoxRoot.appendChild(LIST_ELEMENT);
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

    const match = hash.match(/^\/edit\/(.+)$/);
    if (match) {
      const presetId = match[1];
      this.renderForm(presetId);
    } else {
      this.renderList();
    }
  }

  renderForm(presetId) {
    const preset = this.presetManager.getPresetById(presetId);
    if (!preset) {
      console.error(`[${PLUGIN_NAME}] Preset not found: ${presetId}`);
      this.renderList();
      return;
    }

    this.lbNaiModuleBoxRoot.innerHTML = "";

    // 툴바 생성
    const toolbarEl = document.createElement("lnpm-toolbar");
    toolbarEl.config = {
      title: preset.comment || "프리셋 편집",
      left: [
        {
          label: "← 목록",
          onClick: () => {
            location.hash = "";
          },
        },
      ],
    };
    this.lbNaiModuleBoxRoot.appendChild(toolbarEl);

    // 폼 페이지 생성
    const formEl = document.createElement("lnpm-form-page");
    formEl.config = {
      moduleBox: this.lbNaiModuleBox,
      presetManager: this.presetManager,
      presetId: preset.id,
    };
    formEl.setAttribute("author", preset.author || "");
    formEl.setAttribute("quality", preset.quality || "");
    formEl.setAttribute("negative", preset.negative || "");
    this.lbNaiModuleBoxRoot.appendChild(formEl);
  }

  setupHashListener() {
    window.addEventListener("hashchange", () => {
      if (this.lbNaiModuleBox) {
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
    if (burgerEl && !burgerEl.classList.contains(LNPM_BUTTON_CLASSNAME)) {
      const presetDiv = document.createElement("lnpm-menu-button");
      burgerEl.addEventListener("click", () => {
        this.openModuleBox();
      });
      burgerEl.appendChild(presetDiv);
      burgerEl.classList.add(LNPM_BUTTON_CLASSNAME);
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
  const app = new LightboardNAIPresetManager();
  await app.initialize();

  // 언로드 핸들러 등록
  if (globalThis.__pluginApis__?.onUnload) {
    globalThis.__pluginApis__.onUnload(() => {
      app.destroy();
    });
  }
})();
