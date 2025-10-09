import {
  PLUGIN_NAME,
  PLUGIN_VERSION,
  RB_BUTTON_CLASSNAME,
} from "./constants.js";
import { RisuAPI } from "./core/risu-api.js";
import { injectStyles } from "./ui/styles.js";
import { RBMenuButton } from "./ui/components/menu-button.js";
import { injectScripts } from "./utils/script-injector.js";
import "./ui/components/blackmarket-list.js";

// 메인 애플리케이션 클래스
class RisuBlackmarket {
  constructor() {
    this.risuAPI = null;
    this.observer = null;
    this.rtModuleBox = null;
    this.rtModuleBoxRoot = document.createElement("div");
    this.rtModuleBoxRoot.className = "rb-wrap";
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

  }

  openModuleBox() {
    if (this.rtModuleBox) return;

    const isMobile = window.innerWidth <= 768;
    const winboxConfig = isMobile
      ? {
          title: "Risu Blackmarket - 블랙마켓",
          x: "center",
          y: "center",
          width: "90%",
          height: "85%",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-resize", "no-max", "no-min", "rb-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        }
      : {
          title: "Risu Blackmarket - 블랙마켓",
          x: "center",
          y: "center",
          width: Math.min(1080, window.innerWidth * 0.9) + "px",
          height: Math.min(800, window.innerHeight * 0.8) + "px",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-max", "no-min", "rb-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        };

    this.rtModuleBox = new WinBox(winboxConfig);
    location.hash = "#/game";
    this.render();
  }

  renderBlackmarketGame() {
    this.rtModuleBoxRoot.innerHTML = "";
    const gameEl = document.createElement("rb-blackmarket-list");
    this.rtModuleBoxRoot.appendChild(gameEl);
  }

  navigate(to) {
    if (location.hash !== `#${to}`) location.hash = to;
    else this.render();
  }

  render() {
    const hash = location.hash.slice(1); // '#' 제거

    if (!hash || hash === "/" || hash === "/game") {
      this.renderBlackmarketGame();
      return;
    }

    // 기본값: 암시장 목록
    this.renderBlackmarketGame();
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
    if (burgerEl && !burgerEl.classList.contains(RB_BUTTON_CLASSNAME)) {
      const blackmarketButtonDiv = document.createElement("rb-menu-button");
      blackmarketButtonDiv.addEventListener("click", () => {
        this.openModuleBox();
      });
      burgerEl.appendChild(blackmarketButtonDiv);
      burgerEl.classList.add(RB_BUTTON_CLASSNAME);
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
  const app = new RisuBlackmarket();
  await app.initialize();

  // 언로드 핸들러 등록
  if (globalThis.__pluginApis__?.onUnload) {
    globalThis.__pluginApis__.onUnload(() => {
      app.destroy();
    });
  }
})();
