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
  /* 기본 스타일 */
  .rt-box {
    z-index:99999 !important;
    pointer-events: auto;
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
  }

  /* 타이핑 게임 스타일 */
  .rt-typing-game {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
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
  }

  .rt-typing-text {
    max-height: 256px;
    overflow-y: auto;
  }

  .rt-typing-text::-webkit-scrollbar {
    width: 0;
  }

  .rt-typing-text p {
    font-size: 21px;
    text-align: justify;
    letter-spacing: 1px;
    word-break: break-all;
    color: #333;
  }

  .rt-typing-text p span {
    position: relative;
    display: inline-block;
    width: 21px;
  }

  .rt-typing-text p span.space {
    width: 14px !important;
  }

  .rt-typing-text p span.correct {
    color: #56964f;
  }

  .rt-typing-text p span.incorrect {
    color: #cb3439;
    outline: 1px solid #fff;
    background: #ffc0cb;
    border-radius: 4px;
    width: 21px;
    display: inline-block;
  }

  .rt-typing-text p span.active {
    color: #17A2B8;
    position: relative;
  }

  .rt-typing-text p span.typing-current {
    font-weight: bold;
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
  }

  .rt-try-again-btn:active {
    transform: scale(0.97);
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
  }

  .rt-result-details li span {
    display: block;
    font-size: 20px;
    margin-left: 10px;
    color: #333;
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
    flex-direction: column;
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
    .rt-try-again-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rt-result-details li:not(:first-child) {
      border-left: 0;
      padding: 0;
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
  "오늘 정말로 다정한 손님이 다녀가셨사옵니다. 그분의 친구분들을 소개해 주신다는 말씀에 소녀는 너무나 기쁘옵니다! 어떤 칵테일을 만들어드려야 할지 벌써부터 설레네요. 부디 마음에 드셨으면",
  "은월은 짧은 탄성을 터뜨렸다. 그녀의 얼굴에 화색이 돌았다. 방금 전까지 희미하게 남아있던 불안감의 그림자가 완전히 걷히고"
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
    this.targetText = getRandomParagraph();

    if (this.typingText) {
      this.typingText.innerHTML = "";
      this.targetText.split("").forEach(char => {
        const spanClass = char === ' ' ? 'space' : '';
        const span = `<span class="${spanClass}">${char}</span>`;
        this.typingText.innerHTML += span;
      });

      const firstSpan = this.typingText.querySelector("span");
      if (firstSpan) {
        firstSpan.classList.add("active");
      }
    }

    // 상태 초기화
    this.reset();
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
   * 타이핑 입력 처리 메인 함수
   */
  handleInput() {
    // 한글 조합 중일 때는 시각적 업데이트만
    if (this.isComposing) {
      this.updateTypingDisplay();
      return;
    }

    if (!this.typingText) return;

    const characters = this.typingText.querySelectorAll("span");
    const currentInput = this.inpField.value;

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
    if (!this.typingText) return;

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

    if (this.onComplete) {
      this.onComplete(stats);
    }
  }

  /**
   * 현재 통계 반환
   * @returns {Object} 통계 객체
   */
  getStats() {
    return {
      wpm: this.wpmTag ? parseInt(this.wpmTag.innerText) : 0,
      cpm: this.cpmTag ? parseInt(this.cpmTag.innerText) : 0,
      mistakes: this.mistakes,
      accuracy: this.charIndex > 0 ? ((this.charIndex - this.mistakes) / this.charIndex * 100).toFixed(1) : 100
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

;// ./src/ui/components/typing-game.js


/**
 * 타이핑 게임 메인 컴포넌트
 * - TypingEngine을 사용하여 타이핑 게임 UI 구성
 * - WinBox 모달 내에서 실행
 */
class TypingGame extends HTMLElement {
  constructor() {
    super();
    this.engine = null;
  }

  connectedCallback() {
    this.render();
    this.initializeEngine();
  }

  render() {
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
                <p>실수:</p>
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
  }

  handleComplete(stats) {
    console.log("타이핑 완료!", stats);
    // 완료 시 자동으로 다음 문단 로드
    setTimeout(() => {
      this.engine.restart();
    }, 500);
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
          minwidth: "90%",
          minheight: "85%",
          mount: this.rtModuleBoxRoot,
          background: "#fff",
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
          width: Math.min(820, window.innerWidth * 0.9) + "px",
          height: Math.min(600, window.innerHeight * 0.8) + "px",
          minwidth: "770px",
          minheight: "500px",
          mount: this.rtModuleBoxRoot,
          background: "#fff",
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
      console.log(wtButtonDiv);
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