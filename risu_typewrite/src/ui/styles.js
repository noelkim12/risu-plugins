export const STYLES = `
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

export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);
}
