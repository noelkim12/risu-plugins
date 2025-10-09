//@name Risu Typewrite
//@display-name Risu Typewrite_v0.1
//@version 0.1
//@description Risu Typewrite for RISU AI
var RisuTypewrite;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ RisuAPI)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(521);


class RisuAPI {
  constructor(pluginApis) {
    this.risuFetch = pluginApis.risuFetch;
    this.nativeFetch = pluginApis.nativeFetch;
    this.getArg = pluginApis.getArg;
    this.getChar = pluginApis.getChar;
    this.setChar = pluginApis.setChar;
    this.addProvider = pluginApis.addProvider;
    this.addRisuScriptHandler = pluginApis.addRisuScriptHandler;
    this.removeRisuScriptHandler = pluginApis.removeRisuScriptHandler;
    this.addRisuReplacer = pluginApis.addRisuReplacer;
    this.removeRisuReplacer = pluginApis.removeRisuReplacer;
    this.onUnload = pluginApis.onUnload;
    this.setArg = pluginApis.setArg;
    this.getDatabase = null;
  }

  async initialize() {
    try {
      this.getDatabase = eval("getDatabase");
      globalThis.__pluginApis__.getDatabase = this.getDatabase;
      return true;
    } catch (error) {
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] Failed to add getDatabase:`, error);
      return false;
    }
  }
}


/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AF: () => (/* binding */ PLUGIN_NAME),
/* harmony export */   ov: () => (/* binding */ RT_BUTTON_CLASSNAME),
/* harmony export */   rZ: () => (/* binding */ EXTERNAL_SCRIPTS)
/* harmony export */ });
/* unused harmony export PLUGIN_VERSION */
const PLUGIN_NAME = "Risu Typewrite";
const PLUGIN_VERSION = "0.1";
const RT_BUTTON_CLASSNAME = "rt-button-appended";

const EXTERNAL_SCRIPTS = [
  {
    src: "https://cdn.jsdelivr.net/npm/idb@8/build/umd.js",
    global: "idb"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/winbox@0.2.82/dist/winbox.bundle.min.js",
    global: "WinBox"
  }
];


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it declares 'RisuTypewrite' on top-level, which conflicts with the current library output.
(() => {

// EXTERNAL MODULE: ./src/constants.js
var constants = __webpack_require__(521);
// EXTERNAL MODULE: ./src/core/risu-api.js
var risu_api = __webpack_require__(300);
;// ./src/ui/styles.js
const STYLES = `
  /* Pretendard 폰트 CDN */
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
  @import url('//fonts.googleapis.com/earlyaccess/notosanskr.css');
  
  /* 전체 폰트 설정 */
  .rt-box * {
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
    font-weight: 600;
    font-size: 19px;
  }
  
  /* 기본 스타일 */
  .rt-box {
    z-index:99999 !important;
    pointer-events: auto;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
  }
  .rt-wrap {
    display:flex;
    flex-direction:column;
    min-height:100%;
    height:100%;
    background:#141823;
    overflow:hidden; /* 자식 요소에서 스크롤 처리 */
    z-index:99999;
    pointer-events: auto;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif;;
  }

  /* WinBox body 영역 높이 설정 */
  .wb-body {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }

  /* WinBox 컨테이너 높이 보장 */
  .winbox.rt-box {
    display: flex !important;
    flex-direction: column !important;
  }

  /* wb-body 직접 자식 요소들이 전체 높이를 차지하도록 */
  .wb-body > * {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  /* 타이핑 게임 스타일 */
  .rt-typing-game {
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  /* 통계 요약 영역 */
  .rt-stats-summary {
    margin-top: 15px;
    padding: 13px 20px;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    background: #f8f9fa;
  }

  .rt-stats-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rt-stats-list li {
    display: flex;
    height: 20px;
    align-items: center;
    position: relative;
  }

  .rt-stats-list li:not(:first-child) {
    padding-left: 22px;
    border-left: 1px solid #bfbfbf;
  }

  .rt-stats-list li p {
    font-size: 19px;
    color: #333;
    margin: 0;
  }

  .rt-stats-list li span {
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
    color: #17A2B8;
  }

  .rt-input-field {
    opacity: 0;
    z-index: -999;
    position: absolute;
  }

  .rt-content-box {
    padding: 13px 20px 0;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rt-typing-text {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .rt-typing-text::-webkit-scrollbar {
    width: 0;
  }

  .rt-typing-text p {
    text-align: justify;
    letter-spacing: 1px;
    word-break: break-all;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rt-typing-text p span {
    position: relative;
    display: inline-block;
    animation: fadeInUp 0.5s ease;
  }

  .rt-typing-text p span.space {
    min-width: 8px;
    max-width: 19px;
  }
  .rt-typing-text p span.space.correct {
    min-width: 8px;
    max-width: 8px;
  }

  .rt-typing-text p span.correct {
    color: #56964f;
  }

  .rt-typing-text p span.incorrect {
    color: #cb3439;
    outline: 1px solid #fff;
    background: #ffc0cb;
    border-radius: 4px;
    display: inline-block;
  }

  .rt-typing-text p span.active {
    color: #17A2B8;
    position: relative;
  }

  .rt-typing-text p span.typing-current {
    font-weight: 600;
  }

  .rt-content {
    margin-top: 17px;
    display: flex;
    padding: 12px 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #bfbfbf;
  }

  .rt-try-again-btn {
    outline: none;
    border: none;
    width: 105px;
    color: #fff;
    padding: 8px 0;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background: #17A2B8;
    transition: transform 0.3s ease;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rt-try-again-btn:active {
    transform: scale(0.97);
  }
  .rt-stats-btn {
    outline: none;
    border: none;
    width: 105px;
    color: #fff;
    padding: 8px 0;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background: #333;
    transition: transform 0.3s ease;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rt-stats-btn:active {
    transform: scale(0.97);
  }

  /* 통계 뷰어 스타일 */
  .rt-total-stats {
    margin-bottom: 30px;
  }

  .rt-total-stats h3,
  .rt-daily-stats h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }

  .rt-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .rt-stat-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #17A2B8;
    text-align: center;
  }

  .rt-stat-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .rt-stat-value {
    font-size: 20px;
    font-weight: 700;
    color: #17A2B8;
  }

  .rt-daily-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .rt-daily-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid #17A2B8;
  }

  .rt-daily-date {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .rt-daily-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .rt-daily-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }

  .rt-label {
    color: #666;
    font-weight: 500;
  }

  .rt-value {
    color: #17A2B8;
    font-weight: 600;
  }

  .rt-loading,
  .rt-empty,
  .rt-error {
    text-align: center;
    padding: 40px 20px;
    color: #999;
    font-size: 14px;
  }

  .rt-error {
    color: #cb3439;
  }

  .rt-result-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: calc(100% - 140px);
    justify-content: space-between;
  }

  .rt-result-details li {
    display: flex;
    height: 20px;
    list-style: none;
    position: relative;
    align-items: center;
  }

  .rt-result-details li:not(:first-child) {
    padding-left: 22px;
    border-left: 1px solid #bfbfbf;
  }

  .rt-result-details li p {
    font-size: 19px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rt-result-details li span {
    display: block;
    font-size: 20px;
    margin-left: 10px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  /* 타이핑 통계 스타일 */
  .rt-stats-container {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .rt-stats-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #17A2B8;
  }

  .rt-stats-header h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rt-stats-content {
    min-height: 200px;
  }

  .rt-stats-empty {
    text-align: center;
    padding: 40px 20px;
    color: #999;
  }

  .rt-stats-empty p {
    margin: 5px 0;
    font-size: 16px;
  }

  .rt-stats-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .rt-stat-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #17A2B8;
  }

  .rt-stat-rank {
    font-size: 20px;
    font-weight: bold;
    color: #17A2B8;
    min-width: 40px;
  }

  .rt-stat-details {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 15px;
  }

  .rt-stat-details span {
    padding: 4px 8px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
  }

  .rt-stat-time {
    font-size: 12px;
    color: #999;
  }

  /* 모바일 반응형 (≤768px) */
  @media (max-width: 768px) {
    .rt-typing-game {
      padding: 15px;
    }
    .rt-typing-text p {
      font-size: 18px;
    }
    .rt-result-details {
      width: 100%;
    }
    .rt-stats-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rt-try-again-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rt-result-details li:not(:first-child) {
      border-left: 0;
      padding: 0;
    }
    .rt-stats-summary {
      margin-top: 12px;
      padding: 10px 15px;
    }
    .rt-stats-list {
      flex-direction: column;
      gap: 8px;
    }
    .rt-stats-list li {
      width: 100%;
      justify-content: space-between;
    }
    .rt-stats-list li:not(:first-child) {
      border-left: 0;
      padding-left: 0;
      padding-top: 8px;
      border-top: 1px solid #bfbfbf;
    }
    .rt-stats-list li p {
      font-size: 16px;
    }
    .rt-stats-list li span {
      font-size: 18px;
    }
    .rt-stat-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .rt-stat-details {
      margin: 0;
    }
    .rt-toolbar {
      padding:12px 16px;
      gap:10px;
    }
    .rt-title {
      font-size:16px;
      color:#f0f2f5;
    }
    .rt-btn {
      padding:10px 16px;
      font-size:14px;
      min-height:44px; /* 터치 영역 확보 */
      color:#e8eaed;
    }
    .rt-item {
      padding:16px 18px;
      min-height:60px;
      font-size:15px; /* 모바일 가독성 향상 */
    }
    .rt-item > div {
      line-height:1.6;
    }
    .rt-page {
      padding:16px;
    }
    .rt-field {
      margin-bottom:16px;
    }
    .rt-field label {
      color:#c4c7cc;
    }
    .rt-field input, .rt-field textarea {
      padding:12px 14px;
      font-size:16px; /* iOS zoom 방지 */
      min-height:44px;
      color:#e8eaed;
    }
    .rt-tab {
      padding:10px 16px;
      font-size:13px;
    }
    .rt-tab-icon {
      font-size:18px;
    }
    .rt-preview-content {
      padding:12px;
    }
    .rt-preview-grid {
      gap:10px;
    }
    .rt-upload-icon {
      font-size:40px;
    }
    .rt-upload-text {
      font-size:13px;
    }
    .rt-spinner {
      width:40px;
      height:40px;
      border-width:3px;
    }
    .rt-loading-text {
      font-size:13px;
    }
    .rt-tooltip {
      max-width:260px;
      left:50% !important;
      right:auto !important;
      transform:translateX(-50%);
    }
    .rt-tooltip img {
      width:120px;
      height:120px;
    }
  }

  /* 태블릿 (769px ~ 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .rt-toolbar {
      padding:11px 14px;
    }
    .rt-title {
      color:#eef0f3;
    }
    .rt-btn {
      padding:9px 14px;
      color:#e8eaed;
    }
    .rt-item {
      padding:15px 17px;
      font-size:14.5px;
    }
  }

  /* 데스크탑 (≥1025px) */
  @media (min-width: 1025px) {
    .rt-wrap {
      max-height:calc(100vh - 100px);
    }
    .rt-list {
      max-height:calc(100vh - 200px);
    }
    .rt-page {
      max-height:calc(100vh - 200px);
    }
  }

  @keyframes fadeInUp { 
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

function injectStyles() {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);
}

;// ./src/ui/components/menu-button.js
/**
 * 타자 연습 메뉴 버튼 컴포넌트
 * RISU AI의 메뉴 영역에 표시되는 버튼
 */
class RTMenuButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex items-center cursor-pointer hover:text-green-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- 키보드 본체 -->
          <rect x="2" y="7" width="16" height="8" rx="1.5"></rect>

          <!-- 키들 (간략화) -->
          <line x1="4" y1="9.5" x2="5.5" y2="9.5" stroke-width="1.5"></line>
          <line x1="7" y1="9.5" x2="8.5" y2="9.5" stroke-width="1.5"></line>
          <line x1="10" y1="9.5" x2="11.5" y2="9.5" stroke-width="1.5"></line>
          <line x1="13" y1="9.5" x2="14.5" y2="9.5" stroke-width="1.5"></line>

          <line x1="5" y1="11.5" x2="6.5" y2="11.5" stroke-width="1.5"></line>
          <line x1="8" y1="11.5" x2="9.5" y2="11.5" stroke-width="1.5"></line>
          <line x1="11" y1="11.5" x2="12.5" y2="11.5" stroke-width="1.5"></line>
          <line x1="14" y1="11.5" x2="15.5" y2="11.5" stroke-width="1.5"></line>

          <!-- 스페이스바 -->
          <line x1="6" y1="13.5" x2="14" y2="13.5" stroke-width="2"></line>
        </svg>
        <span class="ml-2">타자연습</span>
      </div>
    `;
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get("rt-menu-button")) {
  customElements.define("rt-menu-button", RTMenuButton);
}

;// ./src/utils/script-injector.js


function injectScripts() {
  constants/* EXTERNAL_SCRIPTS */.rZ.forEach((scriptConfig) => {
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

;// ./src/data/paragraphs.js
/**
 * 타이핑 연습용 문단 데이터
 * 향후 IndexedDB 통합을 위한 구조로 준비
 */
const paragraphs = [
  "오 늘도 희망 없는 삶을 붙잡고 발 버둥 쳐봐도 변치 않는 가난 속에 탄 식만 깊어지는 허무한 인생이여.",
  "잼민이 씨발 발정난 개미친련",
  "이거 완전 챗챈 아님",
  "ㅋㅋㅋㅋㅋ ㅅㅂ 댓글 존나 웃었네",
  ".",
  "로건 : Gemini",
  "잼민아 누가 웃을 때 그렇게 웃어 훠훠훠",
  "쟤는 지하철에서 암컷플하네...",
  "아아아아아아아아아아",
  "배신하듯 떨렸다.",
  "그녀의 자지. 세상에.",
  "야 김채뿡!!!",
  "씨발 다 해줬잖아",
  "요즘 ' ' 가 부족하단 말이지",
  " ",
  "와 어떡하냐 나 임신했을지도 몰름...",
  "아 제미나이 씨발새끼",
  "Gemini3.0이 이번달은 아니지만 곧 나올거라 함(2025.09.11)",
  "속보 제미니 3.0 preview 1009 출시",
  "글자 존나 애매하게 못써서 더 꼴받네 찻붕이들 놕이게 개추존",
  "Gemini 3.0이 다시 10월에 나올 수 있는 희망이 생김",
  "아아 암컷타락쿰질강화모듈 업뎃했다",
  "이 미친 이상성욕자들아 퍼리 게이 이딴것 좀",
  "코끼리를 생각하지 마",
  "오늘 유저 존나 눅눅하네",
  "오늘 유저 존나 바삭하네",
  "유저=적 아니에요?",
  "모든 행복한 가정은 서로 닮았고, 불행한 가정은 저마다의 이유로 불행하다.", // 안나 카레니나
  "부재는 사랑에 아무런 힘도 되지 못했다.", // 위대한 개츠비
  "죽은 자만이 전쟁의 끝을 본다.", // 플라톤 (소설 인용)
  "나는 생각한다, 고로 나는 존재한다.", // 르네 데카르트 (소설 인용)
  "인간은 파괴될 수는 있지만 패배하지는 않는다.", // 노인과 바다
  "오늘 엄마가 죽었다. 아니, 어쩌면 어제. 잘 모르겠다.", // 이방인
  "그를 죽인 것은 결국 병이 아니라 희망이었다.", // 살인자의 기억법
  "모든 동물은 평등하다. 하지만 어떤 동물은 다른 동물보다 더 평등하다.", // 동물농장
  "과거를 지배하는 자가 미래를 지배하고, 현재를 지배하는 자가 과거를 지배한다.", // 1984
  "가장 좋은 시절이자 가장 나쁜 시절이었다.", // 두 도시 이야기
  "행복은 관념이 아니라 활동이다.", // 아리스토텔레스 (소설 인용)
  "내 유일한 재산은 나 자신뿐이었고, 그건 내가 감당하기에 너무 벅찬 재산이었다.", // 어린 왕자
  "세상은 아름답고 싸워볼 가치가 있다.", // 누구를 위하여 종은 울리나
  "아무것도 갖지 않으면 아무것도 잃을 게 없다.", // 무소유
  "진실은 언제나 상상보다 이상하다.", // 셜록 홈즈
  "모든 것을 안다는 것은 모든 것을 용서한다는 것이다.", // 작가 미상 (소_설 인용)
  "사랑은 눈으로 보는 게 아니라 마음으로 보는 거야.", // 한여름 밤의 꿈
  "인생은 가까이서 보면 비극이지만 멀리서 보면 희극이다.", // 찰리 채플린 (소설 인용)
  "겨울이 오면 봄이 멀지 않으리.", // 서풍에 부치는 노래
  "나는 내 운명의 주인이요, 내 영혼의 선장이다.", // 인빅투스
  "박제가 되어 버린 천재를 아시오?", // 날개
  "아는 것이 힘이다.", // 프랜시스 베이컨 (소설 인용)
  "인간의 마음은 갈대와 같다.", // 파스칼 (소설 인용)
  "가장 어두운 시간은 바로 해 뜨기 직전이다.", // 파울로 코엘료
  "의심은 확신만큼이나 우리를 괴롭힌다.", // 오셀로
  "사람들은 자기가 보고 싶은 것만 본다.", // 율리우스 카이사르
  "두려움은 환상이다.", // 마이클 조던 (소설 인용)
  "태양 아래 새로운 것은 없다.", // 성경 (소설 인용)
  "우리가 두려워해야 할 것은 두려움 그 자체이다.", // 프랭클린 D. 루스벨트 (소설 인용)
  "인생은 B와 D 사이의 C다.", // 장 폴 사르트르 (소설 인용)
  "고통이 없으면 얻는 것도 없다.", // 벤자민 프랭클린 (소설 인용)
  "예술은 길고 인생은 짧다.", // 히포크라테스 (소설 인용)
  "나는 나 자신을 찬양하고 노래한다.", // 풀잎
  "꿈꾸지 않으면 사는 게 아니라고.", // 로마의 휴일 (소설 인용)
  "우리는 모두 시궁창에 있지만, 몇몇은 별을 바라본다.", // 오스카 와일드
  "아름다움은 진실이고, 진실은 아름다움이다.", // 존 키츠
  "용서는 용감한 자의 특권이다.", // 마하트마 간디 (소설 인용)
  "희망은 좋은 것이다. 가장 좋은 것일지도 모른다.", // 쇼생크 탈출
  "산다는 것은 서서히 태어나는 것이다.", // 어린 왕자
  "인간은 사회적 동물이다.", // 아리스토텔레스 (소설 인용)
  "아침에는 죽음을 생각하는 것이 좋다.", // 데미안
  "길들인다는 건 관계를 만든다는 뜻이야.", // 어린 왕자
  "눈물은 슬픔의 말 없는 언어다.", // 볼테르 (소설 인용)
  "사람은 사랑하는 사람을 닮아간다.", // 작가 미상 (소설 인용)
  "죽는 날까지 하늘을 우러러 한 점 부끄럼이 없기를.", // 윤동주, 서시
  "약한 자여, 그대 이름은 여자로다.", // 햄릿
  "신은 죽었다.", // 차라투스트라는 이렇게 말했다
  "한 권의 책을 읽고 자신의 삶에서 새 시대를 본 사람이 너무나 많다.", // 월든
  "어둠을 저주하기보다 한 자루의 촛불을 켜는 것이 낫다.", // 중국 속담 (소설 인용)
  "사람이 온다는 건 실은 어마어마한 일이다.", // 방문객
  "오랫동안 꿈을 그리는 사람은 마침내 그 꿈을 닮아간다.", // 앙드레 말로
  "나는 단 한 번도 아름답지 않은 것을 사랑한 적이 없다.", // 칼의 노래
  "가장 개인적인 것이 가장 창의적인 것이다.", // 봉준호 (소설 인용)
  "우리는 모두 별의 먼지로 되어 있다.", // 코스모스
  "모든 살아있는 것은 상처받기 마련이다.", // 작가 미상 (소설 인용)
  "가난은 죄가 아니다. 하지만 큰 불편이다.", // 탈무드 (소설 인용)
  "배우는 것은 작별하는 것이다.", // 작가 미상 (소설 인용)
  "세상은 고통으로 가득하지만, 그것을 극복하는 사람들로도 가득하다.", // 헬렌 켈러
  "내가 그의 이름을 불러주었을 때, 그는 나에게로 와서 꽃이 되었다.", // 김춘수, 꽃
  "진정한 여행은 새로운 풍경을 보는 것이 아니라, 새로운 눈을 갖는 데 있다.", // 마르셀 프루스트
  "바람이 불지 않을 때 바람개비를 돌리는 방법은 앞으로 달려나가는 것이다.", // 작가 미상 (소설 인용)
  "혁명은 익은 사과가 떨어지는 것처럼 일어나는 것이 아니다. 우리가 떨어뜨리는 것이다.", // 체 게바라
  "사랑받지 못하는 것은 슬픈 일이다. 하지만 사랑할 수 없는 것은 더 슬픈 일이다.", // 작가 미상
  "모든 어른은 한때 어린이였다. 그러나 그것을 기억하는 어른은 거의 없다.", // 어린 왕자
  "우리가 다시 만날 때까지, 신이 그대와 함께하기를.", // 아일랜드 격언
  "인생은 흘러가는 것이 아니라 채워지는 것이다.", // 존 러스킨
  "예술은 자연을 모방하는 것이 아니라, 자연을 완성하는 것이다.", // 아리스토텔레스
  "절망의 가장 깊은 곳에서 희망이 시작된다.", // 작가 미상
  "당신이 허비한 오늘은 어제 죽은 이가 그토록 바라던 내일이다.", // 소포클레스
  "나만이 내 인생을 바꿀 수 있다. 아무도 날 대신해 줄 수 없다.", // 캐럴 버넷
  "행동의 가치는 그 행동을 끝까지 이루는 데 있다.", // 칭기즈 칸
  "나는 빗소리를 사랑했다. 그것은 세상의 모든 소리를 지워주었기 때문이다.", // 살인자의 기억법
  "가장 높은 곳에 도달하려면 가장 낮은 곳부터 시작하라.", // 푸블릴리우스 시루스
  "오늘 걷지 않으면 내일은 뛰어야 한다.", // 작가 미상 (소설 인용)
  "인간은 이성적인 동물이 아니라 이성을 사용할 줄 아는 동물이다.", // 로버트 하인라인
  "성공은 최종적인 것이 아니며, 실패는 치명적인 것이 아니다. 중요한 것은 계속하려는 용기다.", // 윈스턴 처칠
  "고독은 스스로 선택할 때만 의미가 있다.", // 밀란 쿤데라
  "모든 비극의 끝에는 새로운 시작이 있다.", // 작가 미상
  "인생에서 가장 큰 영광은 결코 넘어지지 않는 데 있는 것이 아니라, 넘어질 때마다 일어서는 데 있다.", // 넬슨 만델라
  "가장 현명한 사람은 자신을 아는 사람이다.", // 소크라테스
  "음악은 세상의 모든 언어이다.", // 헨리 워즈워스 롱펠로
  "당신은 유일하다. 그리고 그것이 당신의 힘이다.", // 작가 미상
  "우리가 보는 세상은 우리 자신의 반영이다.", // 작가 미상
  "용기란 두려움이 없는 것이 아니라, 두려움에 맞서는 것이다.", // 마크 트웨인
  "인생의 목적은 목적 있는 삶을 사는 것이다.", // 로버트 번
  "책 없는 방은 영혼 없는 육체와도 같다.", // 키케로
  "지식의 유일한 원천은 경험이다.", // 알베르트 아인슈타인
  "아름다움은 보는 사람의 눈 속에 있다.", // 마거릿 울프 헝거포드
  "과거에서 배우고, 오늘을 살고, 내일을 꿈꿔라.", // 알베르트 아인슈타인
  "인생은 한 권의 책과 같다. 어리석은 이는 마구 넘겨버리지만, 현명한 이는 열심히 읽는다.", // 장 파울
];

/**
 * 랜덤 문단 가져오기
 * @returns {string} 랜덤하게 선택된 문단
 */
function getRandomParagraph() {
  const ranIndex = Math.floor(Math.random() * paragraphs.length);
  return paragraphs[ranIndex];
}

/**
 * 특정 인덱스의 문단 가져오기
 * @param {number} index - 문단 인덱스
 * @returns {string} 선택된 문단
 */
function getParagraph(index) {
  if (index < 0 || index >= paragraphs.length) {
    return paragraphs[0];
  }
  return paragraphs[index];
}

/**
 * 전체 문단 개수 반환
 * @returns {number} 문단 개수
 */
function getParagraphCount() {
  return paragraphs.length;
}

;// ./src/data/chatGetter.js
/**
 * 긴 텍스트에서 연속된 문장들을 200자 이내로 묶어 랜덤 반환
 * - 불허 특수문자 제거 → 문장 분할 → 연속 병합
 * - 실패 시 최대 5회까지 재귀 재시도
 *
 * @param {string} text
 * @param {{ maxLen?: number, minLen?: number }} [opts]
 * @param {number} [_attempt] 내부 재시도 카운터 (외부에서 쓰지 말 것)
 * @returns {string|null}
 */
function pickRandomSentence(text, opts = {}, _attempt = 1) {
  console.log("_attempt", _attempt);
  const maxAttempts = 10;
  const maxLen = Math.max(20, opts.maxLen ?? 100);   // 기본 100, 최소 20
  const minLen = Math.max(10, Math.min(opts.minLen ?? 10, maxLen)); // 기본 40

  if (typeof text !== 'string' || !text.trim()) {
    return null;
  }

  // 1) 문장 분할
  const rawSentences = text
    .split(/(?<=[.?!])\s+|[\r\n]+|(?<=”)\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  // 2) 정리 함수 (불허 특수문자 제거 + 구두점 정리)
  const sanitize = (s) => {
    let t = s.replace(/<[^>]+>/g, '');                   // 태그 제거
    t = t.replaceAll(/[^가-힣A-Za-z0-9 .,\?!'"[:\]\-–—]/gu, ''); // 허용 문자 외 제거
    t = t.replaceAll(/([.?!\-])\1{2,}/g, '$1');            // "!!!" → "!", "..." → "."
    t = t.replaceAll(/\s{2,}/g, ' ').trim();               // 공백 정리
    return t;
  };

  const sentences = rawSentences
    .map(sanitize)
    .map(s => s.replace(/^[“"]\s*|\s*[”"]$/g, '"'))     // 따옴표 균일화(선택)
    .filter(s => s.length >= 4 && s.length <= 160)      // 과도하게 긴 단일 문장 배제
    .filter(s => s.split(/\s+/).length >= 2);           // 단어 2개 이상

  let result = null;

  if (sentences.length > 0) {
    // 3) 연속 병합 후보 생성 (시작 인덱스 셔플)
    const idxs = Array.from({ length: sentences.length }, (_, i) => i);
    for (let i = idxs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
    }

    const candidates = [];

    outer:
    for (const start of idxs) {
      let chunk = '';
      for (let cur = start; cur < sentences.length; cur++) {
        const next = sentences[cur];
        const joined = chunk ? `${chunk} ${next}` : next;

        if (joined.length > maxLen) {
          if (chunk.length >= minLen) {
            candidates.push(chunk);
          }
          continue outer;
        }
        chunk = joined;
      }
      if (chunk.length >= minLen && chunk.length <= maxLen) {
        candidates.push(chunk);
      }
    }

    // 후보 없으면 단일 문장 fallback
    let pool = candidates;
    if (pool.length === 0) {
      pool = sentences.filter(s => s.length <= maxLen && s.length >= minLen);
    }

    if (pool.length > 0) {
      const quoted = pool.filter(s => /^["].+["]$/.test(s) || /["]/.test(s));
      const finalPool = quoted.length ? quoted : pool;
      result = finalPool[Math.floor(Math.random() * finalPool.length)];
    }
  }

  // 4) 실패 시 최대 10회까지 재귀 재시도
  if (result == null && _attempt < maxAttempts) {
    return pickRandomChunk(text, opts, _attempt + 1);
  }

  return result; // 그래도 없으면 null
}

;// ./src/core/typing-engine.js



/**
 * 타이핑 게임 엔진 클래스
 * - 타이핑 로직 관리
 * - 한글 조합(compositionstart/end) 처리
 * - WPM/CPM/mistakes 계산
 * - 상태 관리 및 이벤트 처리
 */
class TypingEngine {
  constructor(config = {}) {
    // DOM 요소
    this.typingText = config.typingText;
    this.inpField = config.inpField;
    this.mistakeTag = config.mistakeTag;
    this.wpmTag = config.wpmTag;
    this.cpmTag = config.cpmTag;

    // 상태 변수
    this.charIndex = 0;
    this.mistakes = 0;
    this.isTyping = false;
    this.isComposing = false;
    this.targetText = "";
    this.startTime = null;
    this.lastKeyTime = 0;
    this.lastKey = "";
    this.isTransitioning = false; // 문장 전환 중 상태

    // 콜백 함수
    this.onComplete = config.onComplete || (() => {});

    // 이벤트 바인딩
    this.bindEvents();
  }

  /**
   * 이벤트 리스너 바인딩
   */
  bindEvents() {
    if (!this.inpField) return;

    this.inpField.addEventListener("input", () => this.handleInput());
    this.inpField.addEventListener("compositionstart", () => this.handleCompositionStart());
    this.inpField.addEventListener("compositionupdate", () => this.handleCompositionUpdate());
    this.inpField.addEventListener("compositionend", () => this.handleCompositionEnd());

    // 포커스 관리
    document.addEventListener("keydown", () => this.inpField.focus());
    if (this.typingText) {
      this.typingText.addEventListener("click", () => this.inpField.focus());
    }
  }

  /**
   * 새로운 문단 로드 및 초기화
   */
  loadParagraph() {
    // RisuAPI 초기화
    const risuAPI = new risu_api/* RisuAPI */.m(globalThis.__pluginApis__);
    const { getChar } = risuAPI;

    // 현재 채팅 메시지 가져오기
    const currentChatMessage = getChar()?.chats[getChar()?.chatPage]?.message;
    
    // 타겟 텍스트 결정
    this.targetText = this.determineTargetText(currentChatMessage);
    
    // UI 업데이트
    this.updateTypingText();
    
    // 상태 초기화
    this.reset();
    
    // 문장 전환 완료
    this.isTransitioning = false;
  }

  /**
   * 타겟 텍스트를 결정하는 메서드
   * @param {Array} currentChatMessage - 현재 채팅 메시지 배열
   * @returns {string} 타겟 텍스트
   */
  determineTargetText(currentChatMessage) {
    // 채팅 메시지가 없거나 빈 배열인 경우
    if (!currentChatMessage || currentChatMessage.length === 0) {
      return getRandomParagraph();
    }

    // 캐릭터 메시지 필터링
    const charMessages = currentChatMessage.filter(msg => msg.role === "char");
    
    // 캐릭터 메시지가 없는 경우
    if (charMessages.length === 0) {
      return getRandomParagraph();
    }

    // 80% 확률로 캐릭터 메시지에서 문장 선택, 아니면 기본 문단 사용
    if (Math.random() > 0.5) {
      const randomCharMessage = charMessages[Math.floor(Math.random() * charMessages.length)];
      let pickddoolText = pickRandomSentence(randomCharMessage.data);
      return pickddoolText;
    }
    
    return getRandomParagraph();
  }

  /**
   * 타이핑 텍스트 UI를 업데이트하는 메서드
   */
  updateTypingText() {  
    if (!this.typingText) return;

    this.typingText.innerHTML = "";
    
    this.targetText.split("").forEach(char => {
      const spanClass = char === ' ' ? 'space' : '';
      const span = `<span class="${spanClass}">${char}</span>`;
      this.typingText.innerHTML += span;
    });

    // 첫 번째 span에 active 클래스 추가
    const firstSpan = this.typingText.querySelector("span");
    if (firstSpan) {
      firstSpan.classList.add("active");
    }
  }

  /**
   * 상태 초기화
   */
  reset() {
    this.charIndex = 0;
    this.mistakes = 0;
    this.isTyping = false;
    this.isComposing = false;
    this.startTime = null;
    this.lastKeyTime = 0;
    this.lastKey = "";
    this.isTransitioning = false;

    if (this.inpField) {
      this.inpField.value = "";
    }

    this.updateStats();

    // typing-current 클래스 제거
    if (this.typingText) {
      const characters = this.typingText.querySelectorAll("span");
      characters.forEach(span => {
        span.classList.remove("typing-current");
      });
    }
  }

  /**
   * 키 반복 입력 체크
   * @param {string} currentInput - 현재 입력된 텍스트
   * @returns {boolean} 키 반복 여부
   */
  isKeyRepeat(currentInput) {
    const now = Date.now();
    const currentKey = currentInput.slice(-1); // 마지막 입력된 문자
    
    // 같은 키가 100ms 이내에 연속으로 입력된 경우 반복으로 간주
    if (this.lastKey === currentKey && (now - this.lastKeyTime) < 100) {
      return true;
    }
    
    // 키 정보 업데이트
    this.lastKey = currentKey;
    this.lastKeyTime = now;
    
    return false;
  }

  /**
   * 타이핑 입력 처리 메인 함수
   */
  handleInput() {
    // 문장 전환 중이거나 한글 조합 중일 때는 입력 무시
    if (this.isTransitioning || this.isComposing) {
      this.updateTypingDisplay();
      return;
    }

    if (!this.typingText) return;

    const characters = this.typingText.querySelectorAll("span");
    const currentInput = this.inpField.value;

    // 키 반복 방지: 같은 키가 연속으로 입력되는지 체크
    if (this.isKeyRepeat(currentInput)) {
      return;
    }

    // 시각적 업데이트
    this.updateTypingDisplay();

    // 타이핑 완료 체크
    if (this.charIndex >= characters.length - 1) {
      this.inpField.value = "";
      this.handleComplete();
      return;
    }

    // 타이핑 시작
    if (!this.isTyping) {
      this.isTyping = true;
    }

    // 문자 입력/삭제 처리
    if (currentInput.length > this.charIndex) {
      // 새 문자 입력
      const typedChar = currentInput[this.charIndex];
      const targetChar = this.targetText[this.charIndex];

      if (typedChar === targetChar) {
        characters[this.charIndex].classList.add("correct");
      } else {
        this.mistakes++;
        characters[this.charIndex].classList.add("incorrect");
      }
      this.charIndex++;
    } else if (currentInput.length < this.charIndex) {
      // 백스페이스 처리
      if (this.charIndex > 0) {
        this.charIndex--;
        if (characters[this.charIndex].classList.contains("incorrect")) {
          this.mistakes--;
        }
        characters[this.charIndex].classList.remove("correct", "incorrect");
      }
    }

    // active 클래스 업데이트
    this.updateActiveDisplay();

    // 통계 업데이트
    if (!this.startTime) {
      this.startTime = Date.now();
    }
    this.updateStats();
  }

  /**
   * 타이핑 중인 내용 시각적 표시
   */
  updateTypingDisplay() {
    if (!this.typingText || !this.inpField) return;

    const currentInput = this.inpField.value;
    const characters = this.typingText.querySelectorAll("span");

    // typing-current 클래스 업데이트
    characters.forEach(span => span.classList.remove("typing-current"));
    for (let i = 0; i < currentInput.length && i < characters.length; i++) {
      characters[i].classList.add("typing-current");
    }

    this.updateActiveDisplay();
  }

  /**
   * 현재 타이핑 위치의 active 표시 업데이트
   */
  updateActiveDisplay() {
    if (!this.typingText || !this.inpField) return;

    const currentInput = this.inpField.value;
    const characters = this.typingText.querySelectorAll("span");

    // active 클래스 제거
    characters.forEach(span => span.classList.remove("active"));

    // 현재 위치에 active 추가
    if (this.charIndex < characters.length) {
      characters[this.charIndex].classList.add("active");

      // active span 내용 업데이트
      if (currentInput.length > this.charIndex) {
        characters[this.charIndex].innerText = currentInput[this.charIndex] === " " ? "　" : currentInput[this.charIndex];
      } else {
        characters[this.charIndex].innerText = this.targetText[this.charIndex];
      }
    }
  }

  /**
   * 통계 업데이트 (WPM, CPM, Mistakes)
   */
  updateStats() {
    if (!this.typingText || this.isTransitioning) return;

    const characters = this.typingText.querySelectorAll("span");

    // CPM 계산 (공백 제외, 정확한 문자만)
    let correctChars = 0;
    for (let i = 0; i < this.charIndex; i++) {
      if (this.targetText[i] !== ' ' && !characters[i].classList.contains("incorrect")) {
        correctChars++;
      }
    }

    // WPM 계산
    let wpm = 0;
    if (this.startTime) {
      const elapsedTime = (Date.now() - this.startTime) / 1000; // 초 단위
      wpm = Math.round((correctChars / 5) / (elapsedTime / 60));
      wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    }

    // UI 업데이트
    if (this.wpmTag) this.wpmTag.innerText = wpm;
    if (this.cpmTag) this.cpmTag.innerText = correctChars;
    if (this.mistakeTag) this.mistakeTag.innerText = this.mistakes;
  }

  /**
   * 한글 조합 시작 핸들러
   */
  handleCompositionStart() {
    this.isComposing = true;
    this.updateTypingDisplay();
  }

  /**
   * 한글 조합 중 핸들러
   */
  handleCompositionUpdate() {
    this.updateTypingDisplay();
  }

  /**
   * 한글 조합 완료 핸들러
   */
  handleCompositionEnd() {
    this.isComposing = false;
    this.handleInput();
  }

  /**
   * 타이핑 완료 핸들러
   */
  handleComplete() {
    const stats = this.getStats();
    console.log("타이핑 완료!", stats);

    // 문장 전환 중 상태 설정
    this.isTransitioning = true;

    if (this.onComplete) {
      this.onComplete(stats);
    }
  }

  /**
   * 현재 통계 반환
   * @returns {Object} 통계 객체
   */
  getStats() {
    // 공백을 제외한 타이핑한 글자 수 계산
    let nonSpaceCharacters = 0;
    for (let i = 0; i < this.charIndex; i++) {
      if (this.targetText[i] !== ' ') {
        nonSpaceCharacters++;
      }
    }

    return {
      wpm: this.wpmTag ? parseInt(this.wpmTag.innerText) : 0,
      cpm: this.cpmTag ? parseInt(this.cpmTag.innerText) : 0,
      mistakes: this.mistakes,
      accuracy: this.charIndex > 0 ? parseFloat(((this.charIndex - this.mistakes) / this.charIndex * 100).toFixed(1)) : 100,
      characters: nonSpaceCharacters // 공백을 제외한 타이핑한 글자 수
    };
  }

  /**
   * 게임 재시작
   */
  restart() {
    this.loadParagraph();
  }

  /**
   * 이벤트 리스너 제거
   */
  destroy() {
    if (this.inpField) {
      this.inpField.removeEventListener("input", () => this.handleInput());
      this.inpField.removeEventListener("compositionstart", () => this.handleCompositionStart());
      this.inpField.removeEventListener("compositionupdate", () => this.handleCompositionUpdate());
      this.inpField.removeEventListener("compositionend", () => this.handleCompositionEnd());
    }
  }
}

;// ./node_modules/idb/build/index.js
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const transactionDoneMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    // This mapping exists in reverseTransformCache but doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(this.request);
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
        });
    }
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event.newVersion, event));
    }
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking) {
            db.addEventListener('versionchange', (event) => blocking(event.oldVersion, event.newVersion, event));
        }
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event));
    }
    return wrap(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
    get(target, prop) {
        if (!advanceMethodProps.includes(prop))
            return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) {
            cachedFunc = methodMap[prop] = function (...args) {
                advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
            };
        }
        return cachedFunc;
    },
};
async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
        cursor = await cursor.openCursor(...args);
    }
    if (!cursor)
        return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    reverseTransformCache.set(proxiedCursor, unwrap(cursor));
    while (cursor) {
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
    }
}
function isIteratorProp(target, prop) {
    return ((prop === Symbol.asyncIterator &&
        instanceOfAny(target, [IDBIndex, IDBObjectStore, IDBCursor])) ||
        (prop === 'iterate' && instanceOfAny(target, [IDBIndex, IDBObjectStore])));
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get(target, prop, receiver) {
        if (isIteratorProp(target, prop))
            return iterate;
        return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
        return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    },
}));



;// ./src/core/type-storage.js



const DB_NAME = `${constants/* PLUGIN_NAME */.AF}-stats`;
const DB_VERSION = 1;

/**
 * ============================================
 * IndexedDB 설계 명세
 * ============================================
 *
 * [Store 1] daily-stats (일자별 통계)
 * ----------------------------------------
 * keyPath: date (YYYY-MM-DD 형식)
 *
 * 필드:
 * - date: string              일자 (YYYY-MM-DD)
 * - totalCharacters: number   입력한 총 글자 수
 * - completedSentences: number 완료한 문장 수
 * - maxWpm: number            해당 일자 최대 WPM
 * - maxCpm: number            해당 일자 최대 CPM
 * - avgWpm: number            해당 일자 평균 WPM
 * - avgCpm: number            해당 일자 평균 CPM
 * - maxAccuracy: number      해당 일자 최고 정확도
 * - avgAccuracy: number      해당 일자 평균 정확도
 * - sessions: number          세션 수 (평균 계산용)
 * - updatedAt: number         마지막 업데이트 타임스탬프
 *
 *
 * [Store 2] total-stats (전체 총계)
 * ----------------------------------------
 * keyPath: id (고정값: 'total')
 *
 * 필드:
 * - id: 'total'               고정 키
 * - totalCharacters: number   전체 입력 글자 수
 * - totalSentences: number    전체 완료 문장 수
 * - maxWpm: number            역대 최고 WPM
 * - maxCpm: number            역대 최고 CPM
 * - avgWpm: number            전체 평균 WPM
 * - avgCpm: number            전체 평균 CPM
 * - maxAccuracy: number      역대 최고 정확도
 * - avgAccuracy: number      전체 평균 정확도
 * - points: number            누적 포인트 (글자 수 = 포인트)
 * - totalSessions: number     전체 세션 수
 * - updatedAt: number         마지막 업데이트 타임스탬프
 *
 *
 * [포인트 시스템]
 * ----------------------------------------
 * - 문장 완료 시 입력한 글자 수만큼 포인트 적립
 * - 포인트는 total-stats에 누적 저장
 * - 예: 50글자 문장 완료 → 50포인트 적립
 *
 *
 * [평균 계산 방식]
 * ----------------------------------------
 * - 일자별 평균: 해당 일자의 모든 세션 평균
 * - 전체 평균: 모든 일자의 세션 평균을 재계산
 *
 * ============================================
 */

const STORE_DAILY = 'daily-stats';
const STORE_TOTAL = 'total-stats';

/**
 * IndexedDB 초기화
 * @returns {Promise<IDBDatabase>}
 */
async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 일자별 통계 Store
      if (!db.objectStoreNames.contains(STORE_DAILY)) {
        const dailyStore = db.createObjectStore(STORE_DAILY, { keyPath: 'date' });
        dailyStore.createIndex('date', 'date', { unique: true });
        dailyStore.createIndex('updatedAt', 'updatedAt');
      }

      // 전체 총계 Store
      if (!db.objectStoreNames.contains(STORE_TOTAL)) {
        db.createObjectStore(STORE_TOTAL, { keyPath: 'id' });
      }
    },
  });
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 * @returns {string}
 */
function getTodayDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * 타자 세션 기록 (문장 완료 시 호출)
 * @param {Object} sessionData - 세션 데이터
 * @param {number} sessionData.wpm - WPM (Words Per Minute)
 * @param {number} sessionData.cpm - CPM (Characters Per Minute)
 * @param {number} sessionData.characters - 입력한 글자 수
 * @param {number} sessionData.accuracy - 정확도 (0-100)
 * @returns {Promise<{dailyStats: Object, totalStats: Object}>}
 */
async function recordTypingSession(sessionData) {
  const db = await initDB();
  const today = getTodayDate();
  const timestamp = Date.now();

  const { wpm, cpm, characters, accuracy } = sessionData;
  
  // 1. 일자별 통계 업데이트
  let dailyStats = await db.get(STORE_DAILY, today);

  if (!dailyStats) {
    // 신규 일자 데이터 생성
    dailyStats = {
      date: today,
      totalCharacters: 0,
      completedSentences: 0,
      maxWpm: 0,
      maxCpm: 0,
      avgWpm: 0,
      avgCpm: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      sessions: 0,
      updatedAt: timestamp,
    };
  }

  // 기존 데이터 정리 (배열이 있으면 길이로 변환, 숫자가 아니면 0으로 초기화)
  if (Array.isArray(dailyStats.sessions)) {
    dailyStats.sessions = dailyStats.sessions.length;
  } else if (typeof dailyStats.sessions !== 'number' || isNaN(dailyStats.sessions)) {
    dailyStats.sessions = 0;
  }

  // 세션 추가
  dailyStats.sessions += 1;
  dailyStats.totalCharacters += characters;
  dailyStats.completedSentences += 1;
  dailyStats.maxWpm = Math.max(dailyStats.maxWpm, wpm);
  dailyStats.maxCpm = Math.max(dailyStats.maxCpm, cpm);
  dailyStats.maxAccuracy = Math.max(dailyStats.maxAccuracy, accuracy);

  // 평균 계산 (누적 평균 방식)
  const sessionCount = dailyStats.sessions;
  if (sessionCount > 0) {
    // 기존 평균값이 NaN이면 0으로 초기화
    if (isNaN(dailyStats.avgWpm)) dailyStats.avgWpm = 0;
    if (isNaN(dailyStats.avgCpm)) dailyStats.avgCpm = 0;
    if (isNaN(dailyStats.avgAccuracy)) dailyStats.avgAccuracy = 0;
    
    // 누적 평균 계산: (기존평균 * (세션수-1) + 현재값) / 세션수
    dailyStats.avgWpm = ((dailyStats.avgWpm * (sessionCount - 1)) + wpm) / sessionCount;
    dailyStats.avgCpm = ((dailyStats.avgCpm * (sessionCount - 1)) + cpm) / sessionCount;
    dailyStats.avgAccuracy = ((dailyStats.avgAccuracy * (sessionCount - 1)) + accuracy) / sessionCount;
  }
  dailyStats.updatedAt = timestamp;

  await db.put(STORE_DAILY, dailyStats);

  // 2. 전체 총계 업데이트
  let totalStats = await db.get(STORE_TOTAL, 'total');

  if (!totalStats) {
    // 신규 총계 데이터 생성
    totalStats = {
      id: 'total',
      totalCharacters: 0,
      totalSentences: 0,
      maxWpm: 0,
      maxCpm: 0,
      avgWpm: 0,
      avgCpm: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      points: 0,
      totalSessions: 0,
      updatedAt: timestamp,
    };
  }

  // 총계 업데이트
  totalStats.totalCharacters += characters;
  totalStats.totalSentences += 1;
  totalStats.maxWpm = Math.max(totalStats.maxWpm, wpm);
  totalStats.maxCpm = Math.max(totalStats.maxCpm, cpm);
  totalStats.maxAccuracy = Math.max(totalStats.maxAccuracy, accuracy);
  totalStats.points += characters; // 글자 수만큼 포인트 적립
  totalStats.totalSessions += 1;
  
  // localStorage에 포인트 저장
  try {
    localStorage.setItem('risu-point', totalStats.points.toString());
  } catch (error) {
    console.warn('Failed to save points to localStorage:', error);
  }

  // 전체 평균 재계산 (누적 평균 방식)
  const totalSessionCount = totalStats.totalSessions;
  if (totalSessionCount > 0) {
    // 기존 평균값이 NaN이면 0으로 초기화
    if (isNaN(totalStats.avgWpm)) totalStats.avgWpm = 0;
    if (isNaN(totalStats.avgCpm)) totalStats.avgCpm = 0;
    if (isNaN(totalStats.avgAccuracy)) totalStats.avgAccuracy = 0;
    
    // 누적 평균 계산: (기존평균 * (세션수-1) + 현재값) / 세션수
    totalStats.avgWpm = ((totalStats.avgWpm * (totalSessionCount - 1)) + wpm) / totalSessionCount;
    totalStats.avgCpm = ((totalStats.avgCpm * (totalSessionCount - 1)) + cpm) / totalSessionCount;
    totalStats.avgAccuracy = ((totalStats.avgAccuracy * (totalSessionCount - 1)) + accuracy) / totalSessionCount;
  }
  totalStats.updatedAt = timestamp;

  await db.put(STORE_TOTAL, totalStats);

  return { dailyStats, totalStats };
}

/**
 * 특정 일자 통계 조회
 * @param {string} date - 조회할 날짜 (YYYY-MM-DD), 생략 시 오늘
 * @returns {Promise<Object|null>}
 */
async function getDailyStats(date = null) {
  const db = await initDB();
  const targetDate = date || getTodayDate();
  return await db.get(STORE_DAILY, targetDate);
}

/**
 * 전체 총계 조회
 * @returns {Promise<Object>}
 */
async function getTotalStats() {
  const db = await initDB();
  const stats = await db.get(STORE_TOTAL, 'total');

  // 초기 상태 반환
  if (!stats) {
    return {
      id: 'total',
      totalCharacters: 0,
      totalSentences: 0,
      maxWpm: 0,
      maxCpm: 0,
      avgWpm: 0,
      avgCpm: 0,
      maxAccuracy: 0,
      avgAccuracy: 0,
      points: 0,
      totalSessions: 0,
      updatedAt: Date.now(),
    };
  }

  return stats;
}

/**
 * 모든 일자별 통계 조회 (날짜 내림차순)
 * @param {number} limit - 조회 제한 수 (생략 시 전체)
 * @returns {Promise<Array<Object>>}
 */
async function getAllDailyStats(limit = null) {
  const db = await initDB();
  const allStats = await db.getAll(STORE_DAILY);

  // 날짜 내림차순 정렬
  allStats.sort((a, b) => b.date.localeCompare(a.date));

  return limit ? allStats.slice(0, limit) : allStats;
}

/**
 * 포인트 조회 (IndexedDB 우선, localStorage 백업)
 * @returns {Promise<number>}
 */
async function getPoints() {
  const totalStats = await getTotalStats();
  
  // IndexedDB에 데이터가 있으면 사용
  if (totalStats.points > 0) {
    return totalStats.points;
  }
  
  // IndexedDB에 데이터가 없으면 localStorage에서 확인
  try {
    const localPoints = localStorage.getItem('risu-point');
    if (localPoints !== null) {
      const points = parseInt(localPoints, 10);
      if (!isNaN(points) && points >= 0) {
        return points;
      }
    }
  } catch (error) {
    console.warn('Failed to read points from localStorage:', error);
  }
  
  return totalStats.points;
}

/**
 * 특정 일자 통계 삭제
 * @param {string} date - 삭제할 날짜 (YYYY-MM-DD)
 * @returns {Promise<void>}
 */
async function deleteDailyStats(date) {
  const db = await initDB();
  await db.delete(STORE_DAILY, date);

  // 전체 평균 재계산
  await recalculateTotalStats();
}

/**
 * 전체 통계 초기화 (모든 데이터 삭제)
 * @returns {Promise<void>}
 */
async function resetAllStats() {
  const db = await initDB();

  // 모든 일자별 통계 삭제
  const allDates = await db.getAllKeys(STORE_DAILY);
  await Promise.all(allDates.map(date => db.delete(STORE_DAILY, date)));

  // 총계 초기화
  await db.put(STORE_TOTAL, {
    id: 'total',
    totalCharacters: 0,
    totalSentences: 0,
    maxWpm: 0,
    maxCpm: 0,
    avgWpm: 0,
    avgCpm: 0,
    maxAccuracy: 0,
    avgAccuracy: 0,
    points: 0,
    totalSessions: 0,
    updatedAt: Date.now(),
  });
  
  // localStorage 포인트 초기화
  try {
    localStorage.setItem('risu-point', '0');
  } catch (error) {
    console.warn('Failed to reset points in localStorage:', error);
  }
}

/**
 * 전체 총계 재계산 (일자별 데이터 기반)
 * @returns {Promise<void>}
 */
async function recalculateTotalStats() {
  const db = await initDB();
  const allDailyStats = await db.getAll(STORE_DAILY);

  let totalCharacters = 0;
  let totalSentences = 0;
  let maxWpm = 0;
  let maxCpm = 0;
  let maxAccuracy = 0;
  let totalWpmSum = 0;
  let totalCpmSum = 0;
  let totalAccuracySum = 0;
  let totalSessionCount = 0;
  let points = 0;

  allDailyStats.forEach(daily => {
    totalCharacters += daily.totalCharacters;
    totalSentences += daily.completedSentences;
    maxWpm = Math.max(maxWpm, daily.maxWpm);
    maxCpm = Math.max(maxCpm, daily.maxCpm);
    maxAccuracy = Math.max(maxAccuracy, daily.maxAccuracy);
    points += daily.totalCharacters; // 글자 수 = 포인트

    // sessions가 배열인 경우 길이로 변환, 숫자가 아니면 0으로 처리
    let sessionCount = 0;
    if (Array.isArray(daily.sessions)) {
      sessionCount = daily.sessions.length;
    } else if (typeof daily.sessions === 'number' && !isNaN(daily.sessions)) {
      sessionCount = daily.sessions;
    }

    totalSessionCount += sessionCount;
    
    // 평균값이 NaN이면 0으로 처리
    const avgWpm = isNaN(daily.avgWpm) ? 0 : daily.avgWpm;
    const avgCpm = isNaN(daily.avgCpm) ? 0 : daily.avgCpm;
    const avgAccuracy = isNaN(daily.avgAccuracy) ? 0 : daily.avgAccuracy;
    
    totalWpmSum += avgWpm * sessionCount;
    totalCpmSum += avgCpm * sessionCount;
    totalAccuracySum += avgAccuracy * sessionCount;
  });

  // 평균 계산 및 NaN 처리
  const avgWpm = totalSessionCount > 0 ? totalWpmSum / totalSessionCount : 0;
  const avgCpm = totalSessionCount > 0 ? totalCpmSum / totalSessionCount : 0;
  const avgAccuracy = totalSessionCount > 0 ? totalAccuracySum / totalSessionCount : 0;

  const totalStats = {
    id: 'total',
    totalCharacters,
    totalSentences,
    maxWpm,
    maxCpm,
    maxAccuracy,
    avgWpm: isNaN(avgWpm) ? 0 : avgWpm,
    avgCpm: isNaN(avgCpm) ? 0 : avgCpm,
    avgAccuracy: isNaN(avgAccuracy) ? 0 : avgAccuracy,
    points,
    totalSessions: totalSessionCount,
    updatedAt: Date.now(),
  };

  await db.put(STORE_TOTAL, totalStats);
  
  // localStorage에 포인트 저장
  try {
    localStorage.setItem('risu-point', totalStats.points.toString());
  } catch (error) {
    console.warn('Failed to save points to localStorage:', error);
  }
}

/**
 * 전체 데이터베이스 조회 (디버깅용)
 * @returns {Promise<{daily: Array, total: Object}>}
 */
async function getAllData() {
  const db = await initDB();
  const daily = await db.getAll(STORE_DAILY);
  const total = await db.get(STORE_TOTAL, 'total');

  return { daily, total };
}

;// ./src/ui/components/stats-viewer.js


/**
 * 통계 보기 컴포넌트
 * - 전체 통계 및 일자별 통계 표시
 * - WinBox 모달 내에서 실행
 */
class StatsViewer extends HTMLElement {
  constructor() {
    super();
    this.totalStats = null;
    this.dailyStats = [];
  }

  connectedCallback() {
    this.render();
    this.loadStats();
  }

  render() {
    this.innerHTML = `
      <div class="rt-stats-container">
        <div class="rt-stats-header">
          <h2>타이핑 통계</h2>
        </div>
        
        <div class="rt-stats-content">
          <!-- 전체 통계 -->
          <div class="rt-total-stats">
            <h3>전체 통계</h3>
            <div class="rt-stats-grid">
              <div class="rt-stat-card">
                <div class="rt-stat-label">총 포인트</div>
                <div class="rt-stat-value" id="total-points">0</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">총 글자 수</div>
                <div class="rt-stat-value" id="total-characters">0</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">완료 문장 수</div>
                <div class="rt-stat-value" id="total-sentences">0</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">최고 WPM</div>
                <div class="rt-stat-value" id="max-wpm">0</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">최고 CPM</div>
                <div class="rt-stat-value" id="max-cpm">0</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">평균 WPM</div>
                <div class="rt-stat-value" id="avg-wpm">0</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">최고 정확도</div>
                <div class="rt-stat-value" id="max-accuracy">0%</div>
              </div>
              <div class="rt-stat-card">
                <div class="rt-stat-label">평균 정확도</div>
                <div class="rt-stat-value" id="avg-accuracy">0%</div>
              </div>
            </div>
          </div>

          <!-- 일자별 통계 -->
          <div class="rt-daily-stats">
            <h3>일자별 통계</h3>
            <div class="rt-daily-list" id="daily-list">
              <div class="rt-loading">로딩 중...</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  async loadStats() {
    try {
      // 전체 통계 로드
      this.totalStats = await getTotalStats();
      this.updateTotalStats();

      // 일자별 통계 로드 (최근 30일)
      this.dailyStats = await getAllDailyStats(30);
      this.updateDailyStats();
    } catch (error) {
      console.error("통계 로드 실패:", error);
      this.showError("통계를 불러오는데 실패했습니다.");
    }
  }

  updateTotalStats() {
    if (!this.totalStats) return;
    
    const elements = {
      'total-points': this.totalStats.points || 0,
      'total-characters': this.totalStats.totalCharacters || 0,
      'total-sentences': this.totalStats.totalSentences || 0,
      'max-wpm': this.totalStats.maxWpm || 0,
      'max-cpm': this.totalStats.maxCpm || 0,
      'avg-wpm': Math.round(this.totalStats.avgWpm || 0),
      'max-accuracy': `${Math.round(this.totalStats.maxAccuracy || 0)}%`,
      'avg-accuracy': `${Math.round(this.totalStats.avgAccuracy || 0)}%`
    };

    Object.entries(elements).forEach(([id, value]) => {
      const element = this.querySelector(`#${id}`);
      if (element) {
        element.textContent = value.toLocaleString();
      }
    });
  }

  updateDailyStats() {
    const dailyList = this.querySelector('#daily-list');
    if (!dailyList) return;

    if (this.dailyStats.length === 0) {
      dailyList.innerHTML = '<div class="rt-empty">아직 통계 데이터가 없습니다.</div>';
      return;
    }

    dailyList.innerHTML = this.dailyStats.map(daily => `
      <div class="rt-daily-item">
        <div class="rt-daily-date">${this.formatDate(daily.date)}</div>
        <div class="rt-daily-stats">
          <div class="rt-daily-stat">
            <span class="rt-label">글자 수:</span>
            <span class="rt-value">${daily.totalCharacters.toLocaleString()}</span>
          </div>
          <div class="rt-daily-stat">
            <span class="rt-label">문장 수:</span>
            <span class="rt-value">${daily.completedSentences}</span>
          </div>
          <div class="rt-daily-stat">
            <span class="rt-label">최고 WPM:</span>
            <span class="rt-value">${daily.maxWpm}</span>
          </div>
          <div class="rt-daily-stat">
            <span class="rt-label">평균 WPM:</span>
            <span class="rt-value">${Math.round(daily.avgWpm)}</span>
          </div>
          <div class="rt-daily-stat">
            <span class="rt-label">최고 정확도:</span>
            <span class="rt-value">${Math.round(daily.maxAccuracy || 0)}%</span>
          </div>
          <div class="rt-daily-stat">
            <span class="rt-label">평균 정확도:</span>
            <span class="rt-value">${Math.round(daily.avgAccuracy || 0)}%</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return '오늘';
    } else if (dateString === yesterday.toISOString().split('T')[0]) {
      return '어제';
    } else {
      return date.toLocaleDateString('ko-KR', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  }

  showError(message) {
    const content = this.querySelector('.rt-stats-content');
    if (content) {
      content.innerHTML = `<div class="rt-error">${message}</div>`;
    }
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get("rt-stats-viewer")) {
  customElements.define("rt-stats-viewer", StatsViewer);
}

;// ./src/ui/components/typing-game.js




/**
 * 타이핑 게임 메인 컴포넌트
 * - TypingEngine을 사용하여 타이핑 게임 UI 구성
 * - WinBox 모달 내에서 실행
 * - IndexedDB에 통계 저장 및 표시
 */
class TypingGame extends HTMLElement {
  constructor() {
    super();
    this.risuAPI = null;
    this.engine = null;
  }

  connectedCallback() {
    this.render();
    this.initializeEngine();
    this.loadStats();
  }

  render() {
    this.style.height = "100%";
    this.innerHTML = `
      <div class="rt-typing-game">
        <input type="text" class="rt-input-field">
        <div class="rt-content-box">
          <div class="rt-typing-text">
            <p></p>
          </div>
          <div class="rt-content">
            <ul class="rt-result-details">
              <li class="rt-mistake">
                <p>Mistakes:</p>
                <span>0</span>
              </li>
              <li class="rt-wpm">
                <p>WPM:</p>
                <span>0</span>
              </li>
              <li class="rt-cpm">
                <p>CPM:</p>
                <span>0</span>
              </li>
            </ul>
            <button class="rt-try-again-btn">다시 시작</button>
          </div>
        </div>

        <!-- 통계 정보 영역 -->
        <div class="rt-stats-summary">
          <ul class="rt-stats-list">
            <li>
              <p>누적 포인트:</p>
              <span class="rt-total-points">0</span>
            </li>
            <li>
              <p>총 평균 WPM:</p>
              <span class="rt-total-avg-wpm">0</span>
            </li>
            <li>
              <p>오늘 평균 WPM:</p>
              <span class="rt-daily-avg-wpm">0</span>
            </li>
            <li>
              <p>최고 정확도:</p>
              <span class="rt-max-accuracy">0%</span>
            </li>
            <li>
              <p></p>
              <button class="rt-stats-btn">통계 보기</button>
            </li>
          </ul>
        </div>
      </div>
    `;
  }

  initializeEngine() {
    const typingText = this.querySelector(".rt-typing-text p");
    const inpField = this.querySelector(".rt-input-field");
    const mistakeTag = this.querySelector(".rt-mistake span");
    const wpmTag = this.querySelector(".rt-wpm span");
    const cpmTag = this.querySelector(".rt-cpm span");
    const tryAgainBtn = this.querySelector(".rt-try-again-btn");
    const statsBtn = this.querySelector(".rt-stats-btn");

    this.engine = new TypingEngine({
      typingText,
      inpField,
      mistakeTag,
      wpmTag,
      cpmTag,
      onComplete: (stats) => this.handleComplete(stats)
    });

    // 첫 문단 로드
    this.engine.loadParagraph();

    // 다시 시작 버튼
    tryAgainBtn.addEventListener("click", () => {
      this.engine.restart();
    });

    // 통계 보기 버튼
    statsBtn.addEventListener("click", () => {
      this.openStatsViewer();
    });
  }

  async handleComplete(stats) {
    try {
      // 디버깅: 받은 stats 확인
      
      // IndexedDB에 타이핑 세션 기록
      // stats: { wpm, cpm, mistakes, accuracy, characters }
      const sessionData = {
        wpm: stats.wpm || 0,
        cpm: stats.cpm || 0,
        characters: stats.characters || 0,
        accuracy: stats.accuracy || 0
      };
      

      // DB에 저장 및 통계 업데이트
      await recordTypingSession(sessionData);

      // 통계 UI 업데이트
      await this.loadStats();

      // 완료 시 자동으로 다음 문단 로드
      setTimeout(() => {
        this.engine.restart();
      }, 200);
    } catch (error) {
      console.error("Failed to save typing session:", error);
      // 에러 발생 시에도 게임은 계속 진행
      setTimeout(() => {
        this.engine.restart();
      }, 500);
    }
  }

  /**
   * 통계 정보 로드 및 UI 업데이트
   */
  async loadStats() {
    try {
      const totalStats = await getTotalStats();
      const dailyStats = await getDailyStats();

      // 총 통계 업데이트
      const totalPointsEl = this.querySelector(".rt-total-points");
      const totalAvgWpmEl = this.querySelector(".rt-total-avg-wpm");
      const dailyAvgWpmEl = this.querySelector(".rt-daily-avg-wpm");
      const maxAccuracyEl = this.querySelector(".rt-max-accuracy");

      if (totalPointsEl) {
        totalPointsEl.textContent = totalStats.points.toLocaleString();
      }
      if (totalAvgWpmEl) {
        totalAvgWpmEl.textContent = Math.round(totalStats.avgWpm);
      }
      if (dailyAvgWpmEl) {
        dailyAvgWpmEl.textContent = dailyStats
          ? Math.round(dailyStats.avgWpm)
          : 0;
      }
      if (maxAccuracyEl) {
        maxAccuracyEl.textContent = `${Math.round(totalStats.maxAccuracy || 0)}%`;
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  }   

  /**
   * 통계 뷰어 WinBox 열기
   */
  openStatsViewer() {
    // WinBox 생성
    const statsWinBox = new WinBox("타이핑 통계", {
      class: "rt-box",
      background: "#141823",
      width: "800px",
      height: "650px",
      x: "center",
      y: "center",
      mount: document.createElement("rt-stats-viewer")
    });

    // WinBox 닫기 이벤트 처리
    statsWinBox.onclose = () => {
      // 통계 뷰어 정리
      const statsViewer = statsWinBox.body.querySelector("rt-stats-viewer");
      if (statsViewer) {
        statsViewer.remove();
      }
    };
  }

  disconnectedCallback() {
    if (this.engine) {
      this.engine.destroy();
    }
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get("rt-typing-game")) {
  customElements.define("rt-typing-game", TypingGame);
}

;// ./src/ui/components/typing-stats.js
/**
 * 타이핑 통계 표시 컴포넌트
 * - 타이핑 기록 및 통계 표시
 * - 향후 IndexedDB 통합 예정
 */
class TypingStats extends HTMLElement {
  constructor() {
    super();
    this.stats = [];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="rt-stats-container">
        <div class="rt-stats-header">
          <h2>타이핑 통계</h2>
        </div>
        <div class="rt-stats-content">
          <div class="rt-stats-empty">
            <p>아직 기록이 없습니다.</p>
            <p>타이핑 게임을 시작해보세요!</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 통계 추가
   * @param {Object} stat - 통계 객체 {wpm, cpm, mistakes, accuracy, timestamp}
   */
  addStat(stat) {
    this.stats.push({
      ...stat,
      timestamp: Date.now()
    });
    this.updateDisplay();
  }

  /**
   * 통계 표시 업데이트
   */
  updateDisplay() {
    const content = this.querySelector(".rt-stats-content");
    if (!content) return;

    if (this.stats.length === 0) {
      content.innerHTML = `
        <div class="rt-stats-empty">
          <p>아직 기록이 없습니다.</p>
          <p>타이핑 게임을 시작해보세요!</p>
        </div>
      `;
      return;
    }

    // 최근 10개 기록만 표시
    const recentStats = this.stats.slice(-10).reverse();

    content.innerHTML = `
      <div class="rt-stats-list">
        ${recentStats.map((stat, index) => `
          <div class="rt-stat-item">
            <div class="rt-stat-rank">#${index + 1}</div>
            <div class="rt-stat-details">
              <span class="rt-stat-wpm">${stat.wpm} WPM</span>
              <span class="rt-stat-cpm">${stat.cpm} CPM</span>
              <span class="rt-stat-accuracy">${stat.accuracy}% 정확도</span>
              <span class="rt-stat-mistakes">${stat.mistakes}개 실수</span>
            </div>
            <div class="rt-stat-time">${this.formatTime(stat.timestamp)}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * 시간 포맷팅
   * @param {number} timestamp - 타임스탬프
   * @returns {string} 포맷된 시간
   */
  formatTime(timestamp) {
    const date = new Date(timestamp);
    const now = Date.now();
    const diff = now - timestamp;

    // 1분 미만
    if (diff < 60000) {
      return "방금 전";
    }
    // 1시간 미만
    if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}분 전`;
    }
    // 24시간 미만
    if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}시간 전`;
    }
    // 그 이상
    return date.toLocaleDateString('ko-KR');
  }

  /**
   * 통계 초기화
   */
  clearStats() {
    this.stats = [];
    this.updateDisplay();
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get("rt-typing-stats")) {
  customElements.define("rt-typing-stats", TypingStats);
}

;// ./src/index.js








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
    this.risuAPI = new risu_api/* RisuAPI */.m(globalThis.__pluginApis__);
    const accepted = await this.risuAPI.initialize();

    if (!accepted) {
      console.log(`[${constants/* PLUGIN_NAME */.AF}] Failed to initialize`);
      return false;
    }

    // UI 초기화
    this.initializeUI();
    this.startObserver();
    this.setupHashListener();

    console.log(`[${constants/* PLUGIN_NAME */.AF}] plugin loaded`);
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
      "div.absolute.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md"
    );
    if (burgerEl && !burgerEl.classList.contains(constants/* RT_BUTTON_CLASSNAME */.ov)) {
      const wtButtonDiv = document.createElement("rt-menu-button");
      wtButtonDiv.addEventListener("click", () => {
        this.openModuleBox();
      });
      burgerEl.appendChild(wtButtonDiv);
      burgerEl.classList.add(constants/* RT_BUTTON_CLASSNAME */.ov);
    }
  }

  destroy() {
    if (this.observer) this.observer.disconnect();
    console.log(`${constants/* PLUGIN_NAME */.AF} 언로드`);
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

})();

RisuTypewrite = __webpack_exports__;
/******/ })()
;