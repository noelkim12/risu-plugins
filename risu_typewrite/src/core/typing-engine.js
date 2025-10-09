import { getRandomParagraph } from "../data/paragraphs.js";

/**
 * 타이핑 게임 엔진 클래스
 * - 타이핑 로직 관리
 * - 한글 조합(compositionstart/end) 처리
 * - WPM/CPM/mistakes 계산
 * - 상태 관리 및 이벤트 처리
 */
export class TypingEngine {
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
