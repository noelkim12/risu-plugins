import { getTotalStats, getAllDailyStats } from "../../core/type-storage.js";

/**
 * 통계 보기 컴포넌트
 * - 전체 통계 및 일자별 통계 표시
 * - WinBox 모달 내에서 실행
 */
export class StatsViewer extends HTMLElement {
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
