import { TypingEngine } from "../../core/typing-engine.js";
import {
  recordTypingSession,
  getTotalStats,
  getDailyStats
} from "../../core/type-storage.js";
import "./stats-viewer.js";

/**
 * 타이핑 게임 메인 컴포넌트
 * - TypingEngine을 사용하여 타이핑 게임 UI 구성
 * - WinBox 모달 내에서 실행
 * - IndexedDB에 통계 저장 및 표시
 */
export class TypingGame extends HTMLElement {
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
