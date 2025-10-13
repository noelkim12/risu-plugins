import {
  PLUGIN_NAME,
  PLUGIN_VERSION,
  RT_BUTTON_CLASSNAME,
} from "./constants.js";
import { RisuAPI } from "./core/risu-api.js";
import { injectStyles } from "./ui/styles.js";
import { RTMenuButton } from "./ui/components/menu-button.js";
import { injectScripts } from "./utils/script-injector.js";
import "./ui/components/typing-game.js";
import "./ui/components/typing-stats.js";

// 메인 애플리케이션 클래스
class RisuTypewrite {
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

  }

  openModuleBox() {
    if (this.rtModuleBox) return;

    const isMobile = window.innerWidth <= 768;
    const winboxConfig = isMobile
      ? {
          title: "Risu Typewrite - 타자 연습",
          x: "center",
          y: "center",
          width: "90%",
          height: "85%",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-resize", "no-max", "no-min", "rt-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        }
      : {
          title: "Risu Typewrite - 타자 연습",
          x: "center",
          y: "center",
          width: Math.min(1080, window.innerWidth * 0.9) + "px",
          height: Math.min(400, window.innerHeight * 0.8) + "px",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-max", "no-min", "rt-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        };

    this.rtModuleBox = new WinBox(winboxConfig);
    location.hash = "#/game";
    this.render();
  }

  renderTypingGame() {
    this.rtModuleBoxRoot.innerHTML = "";
    const gameEl = document.createElement("rt-typing-game");
    this.rtModuleBoxRoot.appendChild(gameEl);
  }

  renderStats() {
    this.rtModuleBoxRoot.innerHTML = "";
    const statsEl = document.createElement("rt-typing-stats");
    this.rtModuleBoxRoot.appendChild(statsEl);
  }

  navigate(to) {
    if (location.hash !== `#${to}`) location.hash = to;
    else this.render();
  }

  render() {
    const hash = location.hash.slice(1); // '#' 제거

    if (!hash || hash === "/" || hash === "/game") {
      this.renderTypingGame();
      return;
    }

    if (hash === "/stats") {
      this.renderStats();
      return;
    }

    // 기본값: 타이핑 게임
    this.renderTypingGame();
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
      "div.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md"
    );
    if (burgerEl && !burgerEl.classList.contains(RT_BUTTON_CLASSNAME)) {
      const wtButtonDiv = document.createElement("rt-menu-button");
      wtButtonDiv.addEventListener("click", () => {
        this.openModuleBox();
      });
      burgerEl.appendChild(wtButtonDiv);
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
