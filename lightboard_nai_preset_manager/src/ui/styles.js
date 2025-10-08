export const STYLES = `
  /* 기본 스타일 */
  .lnpm-wrap {
    display:flex;
    flex-direction:column;
    min-height:100%;
    height:100%;
    background:#141823;
    overflow:hidden; /* 자식 요소에서 스크롤 처리 */
  }
  .lnpm-toolbar {
    display:flex;
    gap:8px;
    align-items:center;
    padding:10px 12px;
    border-bottom:1px solid #2a2f3a;
    background:#10141e;
    flex-shrink:0; /* 고정 크기 유지 */
    z-index:1;
  }
  .lnpm-toolbar > div {
    display:flex;
    gap:8px;
    align-items:center;
  }
  .lnpm-title {
    font-weight:700;
    color:#e6e6e6;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .lnpm-spacer { flex:1 }
  .lnpm-btn {
    padding:8px 12px; border:1px solid #3a4352; background:#0f131a;
    color:#e6e6e6; border-radius:8px; cursor:pointer; white-space:nowrap;
  }
  .lnpm-btn:hover { background:#18212c }
  .lnpm-btn:active { background:#0f131a; transform:scale(0.98) }

  /* 리스트 */
  .lnpm-list {
    display:flex;
    flex-direction:column;
    overflow-y:auto;
    flex:1;
    min-height:0; /* flex 컨테이너 내 스크롤 동작 */
  }
  .lnpm-item {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:14px 16px;
    border-bottom:1px solid #263040;
    height:10%;
    background:#151b25;
    cursor:pointer;
    transition:background 0.2s ease;
    flex-shrink:0; /* 아이템 크기 유지 */
    color:#e8eaed; /* 높은 가시성 밝은 회색 */
    font-size:14px;
    line-height:1.5;
  }
  .lnpm-item > div {
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    flex:1;
  }
  .lnpm-item:hover {
    background:#1a212e;
    color:#f0f2f5; /* hover 시 더 밝게 */
  }
  .lnpm-item:active {
    background:#151b25;
    transform:scale(0.995);
  }
  .lnpm-item:last-child {
    border-bottom:none;
  }
  .lnpm-muted {
    font-size:12px;
    opacity:.6;
    color:#9aa0a6;
  }

  /* 폼 */
  .lnpm-page {
    padding:12px;
    overflow-y:auto;
    flex:1;
    min-height:0;
    display:flex;
    flex-direction:column;
  }
  .lnpm-field {
    display:flex;
    flex-direction:column;
    gap:6px;
    margin-bottom:12px;
  }
  .lnpm-field label {
    font-size:12px;
    opacity:.8;
    color:#e8eaed;
    font-weight:600;
  }
  .lnpm-field input,
  .lnpm-field textarea {
    width:100%;
    padding:10px 12px;
    border:1px solid #333a46;
    background:#0f1217;
    color:#e8eaed;
    font-size: 12px;
    border-radius:8px;
    box-sizing:border-box;
    font-family:inherit;
    resize:vertical;
  }
  .lnpm-field textarea {
    min-height:80px;
  }
  .lnpm-field input:focus,
  .lnpm-field textarea:focus {
    outline:none;
    border-color:#5a7199;
    background:#12161f;
  }
  .lnpm-field input::placeholder,
  .lnpm-field textarea::placeholder {
    color:#6b7280;
    opacity:.8;
  }
  .lnpm-btn-container {
    gap: 8px;
    text-align: right;
  }
  .lnpm-btn-save {
    padding: 6px 12px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  .lnpm-btn-close {
    padding: 6px 12px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  /* 탭 */
  .lnpm-tabs-container {
    flex-shrink:0;
  }
  .lnpm-tabs {
    display:flex;
    border-bottom:1px solid #2a2f3a;
    background:#10141e;
    gap:4px;
  }
  .lnpm-tab {
    display:flex;
    align-items:center;
    gap:6px;
    padding:12px 20px;
    border:none;
    background:transparent;
    color:#9aa0a6;
    cursor:pointer;
    font-size:14px;
    font-weight:500;
    transition:all 0.2s ease;
    border-bottom:2px solid transparent;
  }
  .lnpm-tab:hover {
    color:#e8eaed;
    background:#151b25;
  }
  .lnpm-tab.active {
    color:#e8eaed;
    border-bottom-color:#5a7199;
  }
  .lnpm-tab-icon {
    font-size:16px;
  }
  .lnpm-tab-label {
    white-space:nowrap;
  }

  /* 탭 콘텐츠 */
  .lnpm-tab-content {
    flex:1;
    overflow-y:auto;
    min-height:0;
  }
  .lnpm-prompt-tab {
    padding:12px;
  }

  /* 미리보기 탭 */
  .lnpm-preview-tab {
    display:flex;
    flex-direction:column;
    height:100%;
  }
  .lnpm-preview-content {
    padding:16px;
    display:flex;
    flex-direction:column;
    gap:16px;
  }
  .lnpm-preview-header {
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding-bottom:12px;
    border-bottom:1px solid #2a2f3a;
  }
  .lnpm-preview-title {
    font-size:16px;
    font-weight:600;
    color:#e8eaed;
    margin:0;
  }
  .lnpm-preview-info {
    font-size:12px;
    color:#9aa0a6;
  }

  /* 이미지 그리드 */
  .lnpm-preview-grid {
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:12px;
    margin-top:8px;
  }
  .lnpm-image-card {
    position:relative;
    aspect-ratio:1;
    border-radius:8px;
    border:1px solid #333a46;
    background:#0f1217;
    overflow:hidden;
    transition:transform 0.2s ease, box-shadow 0.2s ease;
  }
  .lnpm-image-card:hover {
    transform:translateY(-2px);
    box-shadow:0 4px 12px rgba(0,0,0,0.3);
  }
  .lnpm-image-preview {
    width:100%;
    height:calc(100% - 50px);
    background-size:cover;
    background-position:center;
    background-repeat:no-repeat;
  }
  .lnpm-image-info {
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    padding:8px 10px;
    background:rgba(15, 20, 26, 0.95);
    border-top:1px solid #2a2f3a;
  }
  .lnpm-image-name {
    font-size:11px;
    color:#e8eaed;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .lnpm-image-size {
    font-size:10px;
    color:#9aa0a6;
    margin-top:2px;
  }
  .lnpm-image-delete {
    position:absolute;
    top:8px;
    right:8px;
    width:28px;
    height:28px;
    border-radius:50%;
    border:none;
    background:rgba(239, 68, 68, 0.9);
    color:#fff;
    font-size:20px;
    line-height:1;
    cursor:pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    transition:all 0.2s ease;
    opacity:0;
  }
  .lnpm-image-card:hover .lnpm-image-delete {
    opacity:1;
  }
  .lnpm-image-delete:hover {
    background:#dc2626;
    transform:scale(1.1);
  }

  /* 업로드 카드 */
  .lnpm-upload-card {
    aspect-ratio:1;
    border:2px dashed #3a4352;
    border-radius:8px;
    background:#0f1217;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition:all 0.2s ease;
  }
  .lnpm-upload-card:hover {
    border-color:#5a7199;
    background:#12161f;
  }
  .lnpm-upload-icon {
    font-size:48px;
    color:#5a7199;
    margin-bottom:8px;
  }
  .lnpm-upload-text {
    font-size:14px;
    color:#9aa0a6;
  }

  /* 로딩 카드 */
  .lnpm-loading-card {
    aspect-ratio:1;
    border:2px solid #3a4352;
    border-radius:8px;
    background:#0f1217;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
  }
  .lnpm-spinner {
    width:48px;
    height:48px;
    border:4px solid #2a2f3a;
    border-top-color:#5a7199;
    border-radius:50%;
    animation:lnpm-spin 0.8s linear infinite;
    margin-bottom:12px;
  }
  .lnpm-loading-text {
    font-size:14px;
    color:#9aa0a6;
  }
  @keyframes lnpm-spin {
    to {
      transform:rotate(360deg);
    }
  }

  /* 미리보기 팁 */
  .lnpm-preview-tips {
    margin-top:8px;
    padding:12px;
    background:#0f1217;
    border-radius:8px;
    border:1px solid #2a2f3a;
  }
  .lnpm-preview-tips p {
    margin:4px 0;
    font-size:12px;
    color:#9aa0a6;
    line-height:1.5;
  }

  /* Tooltip */
  .lnpm-tooltip {
    position:fixed;
    z-index:9999;
    background:#0f1217;
    border:1px solid #3a4352;
    border-radius:8px;
    padding:8px;
    box-shadow:0 4px 16px rgba(0,0,0,0.5);
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    gap:8px;
    max-width:320px;
    pointer-events:none;
    animation:lnpm-tooltip-fade-in 0.2s ease;
  }
  .lnpm-tooltip img {
    width:150px;
    height:150px;
    object-fit:cover;
    border-radius:4px;
    border:1px solid #2a2f3a;
    background:#151b25;
  }
  @keyframes lnpm-tooltip-fade-in {
    from {
      opacity:0;
      transform:translateY(-4px);
    }
    to {
      opacity:1;
      transform:translateY(0);
    }
  }

  /* 모바일 반응형 (≤768px) */
  @media (max-width: 768px) {
    .lnpm-toolbar {
      padding:12px 16px;
      gap:10px;
    }
    .lnpm-title {
      font-size:16px;
      color:#f0f2f5;
    }
    .lnpm-btn {
      padding:10px 16px;
      font-size:14px;
      min-height:44px; /* 터치 영역 확보 */
      color:#e8eaed;
    }
    .lnpm-item {
      padding:16px 18px;
      min-height:60px;
      font-size:15px; /* 모바일 가독성 향상 */
    }
    .lnpm-item > div {
      line-height:1.6;
    }
    .lnpm-page {
      padding:16px;
    }
    .lnpm-field {
      margin-bottom:16px;
    }
    .lnpm-field label {
      color:#c4c7cc;
    }
    .lnpm-field input, .lnpm-field textarea {
      padding:12px 14px;
      font-size:16px; /* iOS zoom 방지 */
      min-height:44px;
      color:#e8eaed;
    }
    .lnpm-tab {
      padding:10px 16px;
      font-size:13px;
    }
    .lnpm-tab-icon {
      font-size:18px;
    }
    .lnpm-preview-content {
      padding:12px;
    }
    .lnpm-preview-grid {
      gap:10px;
    }
    .lnpm-upload-icon {
      font-size:40px;
    }
    .lnpm-upload-text {
      font-size:13px;
    }
    .lnpm-spinner {
      width:40px;
      height:40px;
      border-width:3px;
    }
    .lnpm-loading-text {
      font-size:13px;
    }
    .lnpm-tooltip {
      max-width:260px;
      left:50% !important;
      right:auto !important;
      transform:translateX(-50%);
    }
    .lnpm-tooltip img {
      width:120px;
      height:120px;
    }
  }

  /* 태블릿 (769px ~ 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .lnpm-toolbar {
      padding:11px 14px;
    }
    .lnpm-title {
      color:#eef0f3;
    }
    .lnpm-btn {
      padding:9px 14px;
      color:#e8eaed;
    }
    .lnpm-item {
      padding:15px 17px;
      font-size:14.5px;
    }
  }

  /* 데스크탑 (≥1025px) */
  @media (min-width: 1025px) {
    .lnpm-wrap {
      max-height:calc(100vh - 100px);
    }
    .lnpm-list {
      max-height:calc(100vh - 200px);
    }
    .lnpm-page {
      max-height:calc(100vh - 200px);
    }
  }
`;

export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);
}
