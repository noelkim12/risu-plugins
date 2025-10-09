export const STYLES = `
  /* Pretendard 폰트 CDN */
  @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
  @import url('//fonts.googleapis.com/earlyaccess/notosanskr.css');
  
  /* 전체 폰트 설정 */
  .rb-box * {
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
    font-weight: 600;
    font-size: 19px;
  }
  
  /* 기본 스타일 - 암시장 테마 */
  .rb-box {
    z-index:99999 !important;
    pointer-events: auto;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    border: 2px solid #ff6b35;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }
  .rb-wrap {
    display:flex;
    flex-direction:column;
    min-height:100%;
    height:100%;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
    overflow:hidden; /* 자식 요소에서 스크롤 처리 */
    z-index:99999;
    pointer-events: auto;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    position: relative;
  }
  
  /* 암시장 배경 패턴 */
  .rb-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 107, 53, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  /* WinBox body 영역 높이 설정 */
  .wb-body {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }

  /* WinBox 컨테이너 높이 보장 */
  .winbox.rb-box {
    display: flex !important;
    flex-direction: column !important;
  }

  /* wb-body 직접 자식 요소들이 전체 높이를 차지하도록 */
  .wb-body > * {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  /* 암시장 상점 스타일 */
  .rb-blackmarket-game {
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 20px;
    background: transparent;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    font-family: 'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    position: relative;
    z-index: 1;
  }

  /* 상점 헤더 */
  .rb-shop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #ff6b35;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.2);
  }

  .rb-shop-title {
    color: #ff6b35;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
  }

  .rb-player-info {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .rb-money-display, .rb-cart-count {
    background: rgba(255, 107, 53, 0.1);
    padding: 8px 15px;
    border-radius: 20px;
    color: #ff6b35;
    font-weight: 600;
    border: 1px solid rgba(255, 107, 53, 0.3);
  }

  /* 네비게이션 */
  .rb-shop-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .rb-nav-btn {
    flex: 1;
    padding: 12px 20px;
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
    border: 1px solid #444;
    border-radius: 8px;
    color: #ccc;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-nav-btn:hover {
    background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
    border-color: #ff6b35;
  }

  .rb-nav-btn.active {
    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
    border-color: #ff6b35;
    color: #fff;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }

  /* 상점 컨테이너 */
  .rb-shop-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* 카테고리 필터 */
  .rb-category-filter {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .rb-category-btn {
    padding: 8px 16px;
    background: rgba(255, 107, 53, 0.1);
    border: 1px solid rgba(255, 107, 53, 0.3);
    border-radius: 20px;
    color: #ff6b35;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-category-btn:hover {
    background: rgba(255, 107, 53, 0.2);
  }

  .rb-category-btn.active {
    background: #ff6b35;
    color: #fff;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  }

  /* 상품 그리드 */
  .rb-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    flex: 1;
    overflow-y: auto;
    padding-right: 5px;
  }

  .rb-products-grid::-webkit-scrollbar {
    width: 6px;
  }

  .rb-products-grid::-webkit-scrollbar-track {
    background: rgba(255, 107, 53, 0.1);
    border-radius: 3px;
  }

  .rb-products-grid::-webkit-scrollbar-thumb {
    background: #ff6b35;
    border-radius: 3px;
  }

  /* 상품 카드 */
  .rb-product-card {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #444;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .rb-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.2);
    border-color: #ff6b35;
  }

  .rb-product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #e55a2b);
  }

  /* 희귀도별 색상 */
  .rb-rarity-common::before { background: #888; }
  .rb-rarity-uncommon::before { background: #4CAF50; }
  .rb-rarity-rare::before { background: #2196F3; }
  .rb-rarity-legendary::before { background: #FF9800; }

  .rb-product-icon {
    font-size: 32px;
    text-align: center;
    margin-bottom: 15px;
  }

  .rb-product-info {
    margin-bottom: 15px;
  }

  .rb-product-name {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  .rb-product-description {
    color: #ccc;
    font-size: 14px;
    margin: 0 0 12px 0;
    line-height: 1.4;
  }

  .rb-product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rb-product-price {
    color: #ff6b35;
    font-size: 16px;
    font-weight: 700;
  }

  .rb-product-stock {
    color: #888;
    font-size: 12px;
  }

  .rb-product-actions {
    margin-top: 15px;
  }

  .rb-add-cart-btn {
    width: 100%;
    padding: 10px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-add-cart-btn:hover:not(.disabled) {
    background: linear-gradient(135deg, #e55a2b 0%, #d44a1b 100%);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }

  .rb-add-cart-btn.disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* 인벤토리 스타일 */
  .rb-inventory-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .rb-inventory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    flex: 1;
    overflow-y: auto;
  }

  .rb-inventory-item {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #444;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .rb-item-icon {
    font-size: 24px;
  }

  .rb-item-info {
    flex: 1;
  }

  .rb-item-info h4 {
    color: #fff;
    margin: 0 0 5px 0;
    font-size: 16px;
  }

  .rb-item-info p {
    color: #ccc;
    margin: 0;
    font-size: 14px;
  }

  .rb-sell-btn {
    padding: 8px 12px;
    background: #dc3545;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-sell-btn:hover {
    background: #c82333;
  }

  /* 장바구니 스타일 */
  .rb-cart-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .rb-cart-items {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .rb-cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #444;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .rb-cart-item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .rb-cart-item-name {
    color: #fff;
    font-weight: 600;
  }

  .rb-cart-item-price {
    color: #ff6b35;
    font-size: 14px;
  }

  .rb-remove-item-btn {
    background: #dc3545;
    border: none;
    border-radius: 4px;
    color: #fff;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 12px;
  }

  .rb-cart-summary {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #ff6b35;
    border-radius: 10px;
    padding: 20px;
  }

  .rb-total-price {
    color: #ff6b35;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 15px;
  }

  .rb-cart-actions {
    display: flex;
    gap: 10px;
  }

  .rb-remove-all-btn {
    flex: 1;
    padding: 10px;
    background: #6c757d;
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-remove-all-btn:hover {
    background: #5a6268;
  }

  .rb-purchase-btn {
    flex: 2;
    padding: 12px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-purchase-btn:hover:not(.disabled) {
    background: linear-gradient(135deg, #e55a2b 0%, #d44a1b 100%);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }

  .rb-purchase-btn.disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* 빈 상태 */
  .rb-empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #888;
  }

  .rb-empty-state h3 {
    color: #ccc;
    margin-bottom: 10px;
  }

  /* 통계 요약 영역 */
  .rb-stats-summary {
    margin-top: 15px;
    padding: 13px 20px;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    background: #f8f9fa;
  }

  .rb-stats-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rb-stats-list li {
    display: flex;
    height: 20px;
    align-items: center;
    position: relative;
  }

  .rb-stats-list li:not(:first-child) {
    padding-left: 22px;
    border-left: 1px solid #bfbfbf;
  }

  .rb-stats-list li p {
    font-size: 19px;
    color: #333;
    margin: 0;
  }

  .rb-stats-list li span {
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
    color: #17A2B8;
  }

  .rb-input-field {
    opacity: 0;
    z-index: -999;
    position: absolute;
  }

  .rb-content-box {
    padding: 13px 20px 0;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rb-typing-text {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .rb-typing-text::-webkit-scrollbar {
    width: 0;
  }

  .rb-typing-text p {
    text-align: justify;
    letter-spacing: 1px;
    word-break: break-all;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rb-typing-text p span {
    position: relative;
    display: inline-block;
    animation: fadeInUp 0.5s ease;
  }

  .rb-typing-text p span.space {
    min-width: 8px;
    max-width: 19px;
  }
  .rb-typing-text p span.space.correct {
    min-width: 8px;
    max-width: 8px;
  }

  .rb-typing-text p span.correct {
    color: #56964f;
  }

  .rb-typing-text p span.incorrect {
    color: #cb3439;
    outline: 1px solid #fff;
    background: #ffc0cb;
    border-radius: 4px;
    display: inline-block;
  }

  .rb-typing-text p span.active {
    color: #17A2B8;
    position: relative;
  }

  .rb-typing-text p span.typing-current {
    font-weight: 600;
  }

  .rb-content {
    margin-top: 17px;
    display: flex;
    padding: 12px 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #bfbfbf;
  }

  .rb-try-again-btn {
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

  .rb-try-again-btn:active {
    transform: scale(0.97);
  }
  .rb-stats-btn {
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

  .rb-stats-btn:active {
    transform: scale(0.97);
  }

  /* 통계 뷰어 스타일 */
  .rb-total-stats {
    margin-bottom: 30px;
  }

  .rb-total-stats h3,
  .rb-daily-stats h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }

  .rb-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .rb-stat-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #17A2B8;
    text-align: center;
  }

  .rb-stat-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .rb-stat-value {
    font-size: 20px;
    font-weight: 700;
    color: #17A2B8;
  }

  .rb-daily-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .rb-daily-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid #17A2B8;
  }

  .rb-daily-date {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .rb-daily-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .rb-daily-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }

  .rb-label {
    color: #666;
    font-weight: 500;
  }

  .rb-value {
    color: #17A2B8;
    font-weight: 600;
  }

  .rb-loading,
  .rb-empty,
  .rb-error {
    text-align: center;
    padding: 40px 20px;
    color: #999;
    font-size: 14px;
  }

  .rb-error {
    color: #cb3439;
  }

  .rb-result-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: calc(100% - 140px);
    justify-content: space-between;
  }

  .rb-result-details li {
    display: flex;
    height: 20px;
    list-style: none;
    position: relative;
    align-items: center;
  }

  .rb-result-details li:not(:first-child) {
    padding-left: 22px;
    border-left: 1px solid #bfbfbf;
  }

  .rb-result-details li p {
    font-size: 19px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rb-result-details li span {
    display: block;
    font-size: 20px;
    margin-left: 10px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  /* 타이핑 통계 스타일 */
  .rb-stats-container {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .rb-stats-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #17A2B8;
  }

  .rb-stats-header h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif; !important;
  }

  .rb-stats-content {
    min-height: 200px;
  }

  .rb-stats-empty {
    text-align: center;
    padding: 40px 20px;
    color: #999;
  }

  .rb-stats-empty p {
    margin: 5px 0;
    font-size: 16px;
  }

  .rb-stats-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .rb-stat-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #17A2B8;
  }

  .rb-stat-rank {
    font-size: 20px;
    font-weight: bold;
    color: #17A2B8;
    min-width: 40px;
  }

  .rb-stat-details {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 15px;
  }

  .rb-stat-details span {
    padding: 4px 8px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
  }

  .rb-stat-time {
    font-size: 12px;
    color: #999;
  }

  /* 모바일 반응형 (≤768px) */
  @media (max-width: 768px) {
    .rb-typing-game {
      padding: 15px;
    }
    .rb-typing-text p {
      font-size: 18px;
    }
    .rb-result-details {
      width: 100%;
    }
    .rb-stats-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rb-try-again-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rb-result-details li:not(:first-child) {
      border-left: 0;
      padding: 0;
    }
    .rb-stats-summary {
      margin-top: 12px;
      padding: 10px 15px;
    }
    .rb-stats-list {
      flex-direction: column;
      gap: 8px;
    }
    .rb-stats-list li {
      width: 100%;
      justify-content: space-between;
    }
    .rb-stats-list li:not(:first-child) {
      border-left: 0;
      padding-left: 0;
      padding-top: 8px;
      border-top: 1px solid #bfbfbf;
    }
    .rb-stats-list li p {
      font-size: 16px;
    }
    .rb-stats-list li span {
      font-size: 18px;
    }
    .rb-stat-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .rb-stat-details {
      margin: 0;
    }
    .rb-toolbar {
      padding:12px 16px;
      gap:10px;
    }
    .rb-title {
      font-size:16px;
      color:#f0f2f5;
    }
    .rb-btn {
      padding:10px 16px;
      font-size:14px;
      min-height:44px; /* 터치 영역 확보 */
      color:#e8eaed;
    }
    .rb-item {
      padding:16px 18px;
      min-height:60px;
      font-size:15px; /* 모바일 가독성 향상 */
    }
    .rb-item > div {
      line-height:1.6;
    }
    .rb-page {
      padding:16px;
    }
    .rb-field {
      margin-bottom:16px;
    }
    .rb-field label {
      color:#c4c7cc;
    }
    .rb-field input, .rb-field textarea {
      padding:12px 14px;
      font-size:16px; /* iOS zoom 방지 */
      min-height:44px;
      color:#e8eaed;
    }
    .rb-tab {
      padding:10px 16px;
      font-size:13px;
    }
    .rb-tab-icon {
      font-size:18px;
    }
    .rb-preview-content {
      padding:12px;
    }
    .rb-preview-grid {
      gap:10px;
    }
    .rb-upload-icon {
      font-size:40px;
    }
    .rb-upload-text {
      font-size:13px;
    }
    .rb-spinner {
      width:40px;
      height:40px;
      border-width:3px;
    }
    .rb-loading-text {
      font-size:13px;
    }
    .rb-tooltip {
      max-width:260px;
      left:50% !important;
      right:auto !important;
      transform:translateX(-50%);
    }
    .rb-tooltip img {
      width:120px;
      height:120px;
    }
  }

  /* 태블릿 (769px ~ 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .rb-toolbar {
      padding:11px 14px;
    }
    .rb-title {
      color:#eef0f3;
    }
    .rb-btn {
      padding:9px 14px;
      color:#e8eaed;
    }
    .rb-item {
      padding:15px 17px;
      font-size:14.5px;
    }
  }

  /* 데스크탑 (≥1025px) */
  @media (min-width: 1025px) {
    .rb-wrap {
      max-height:calc(100vh - 100px);
    }
    .rb-list {
      max-height:calc(100vh - 200px);
    }
    .rb-page {
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

export function injectStyles() {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);
}
