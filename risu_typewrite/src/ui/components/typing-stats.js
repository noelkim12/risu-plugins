/**
 * 타이핑 통계 표시 컴포넌트
 * - 타이핑 기록 및 통계 표시
 * - 향후 IndexedDB 통합 예정
 */
export class TypingStats extends HTMLElement {
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
