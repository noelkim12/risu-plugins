import { TypingEngine } from "../../core/typing-engine.js";

/**
 * 타이핑 게임 메인 컴포넌트
 * - TypingEngine을 사용하여 타이핑 게임 UI 구성
 * - WinBox 모달 내에서 실행
 */
export class TypingGame extends HTMLElement {
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
