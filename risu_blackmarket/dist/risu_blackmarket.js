//@name Risu Blackmarket
//@display-name Risu Blackmarket_v0.1
//@version 0.1
//@description Risu Blackmarket for RISU AI
var RisuBlackmarket;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 196:
/***/ (() => {

// 암시장 상점 컴포넌트
class BlackmarketList extends HTMLElement {
  constructor() {
    super();
    this.products = [];
    this.playerMoney = this.getPlayerMoney();
    this.playerInventory = [];
    this.currentView = 'shop'; // shop, inventory, cart
    this.cart = [];
    this.categories = ['all', 'weapons', 'armor', 'accessories', 'consumables'];
    this.currentCategory = 'all';
  }

  connectedCallback() {
    this.render();
    this.loadProducts();
  }

  /**
   * localStorage에서 플레이어 포인트 가져오기
   * @returns {number} 플레이어 보유 포인트
   */
  getPlayerMoney() {
    try {
      const savedPoints = localStorage.getItem('risu-point');
      if (savedPoints !== null) {
        const points = parseInt(savedPoints, 10);
        if (!isNaN(points) && points >= 0) {
          return points;
        }
      }
    } catch (error) {
      console.warn('Failed to load points from localStorage:', error);
    }
    
    // 기본값: 1000 포인트
    return 1000;
  }

  /**
   * localStorage에 플레이어 포인트 저장하기
   * @param {number} points - 저장할 포인트
   */
  savePlayerMoney(points) {
    try {
      localStorage.setItem('risu-point', points.toString());
    } catch (error) {
      console.warn('Failed to save points to localStorage:', error);
    }
  }

  async loadProducts() {
    // 암시장 상품 데이터
    this.products = [
      { id: 1, name: "마법 검", price: 2500, category: "weapons", rarity: "rare", description: "마법이 깃든 강력한 검", stock: 3, icon: "⚔️" },
      { id: 2, name: "드래곤 갑옷", price: 4500, category: "armor", rarity: "legendary", description: "드래곤 비늘로 만든 갑옷", stock: 1, icon: "🛡️" },
      { id: 3, name: "힐링 포션", price: 150, category: "consumables", rarity: "common", description: "체력을 회복하는 포션", stock: 20, icon: "🧪" },
      { id: 4, name: "마나 링", price: 1200, category: "accessories", rarity: "uncommon", description: "마나를 증가시키는 반지", stock: 5, icon: "💍" },
      { id: 5, name: "전설의 방패", price: 3500, category: "armor", rarity: "legendary", description: "고대 전사가 사용한 방패", stock: 1, icon: "🛡️" },
      { id: 6, name: "독 포션", price: 200, category: "consumables", rarity: "common", description: "적에게 독을 거는 포션", stock: 15, icon: "☠️" },
      { id: 7, name: "마법 지팡이", price: 1800, category: "weapons", rarity: "uncommon", description: "마법을 강화하는 지팡이", stock: 8, icon: "🪄" },
      { id: 8, name: "행운의 부적", price: 800, category: "accessories", rarity: "rare", description: "운을 높여주는 부적", stock: 3, icon: "🍀" },
      { id: 9, name: "용의 검", price: 5000, category: "weapons", rarity: "legendary", description: "용의 힘이 깃든 최강의 검", stock: 1, icon: "🐉" },
      { id: 10, name: "신비한 망토", price: 2200, category: "armor", rarity: "rare", description: "은신 능력을 주는 망토", stock: 2, icon: "👻" }
    ];
    this.render();
  }

  render() {
    this.className = 'rb-blackmarket-game';
    this.innerHTML = `
      <div class="rb-shop-header">
        <h1 class="rb-shop-title">🕴️ 암시장 상점</h1>
        <div class="rb-player-info">
          <div class="rb-money-display">💰 ${this.playerMoney.toLocaleString()}P</div>
          <div class="rb-cart-count">🛒 ${this.cart.length}</div>
        </div>
      </div>
      
      <div class="rb-shop-nav">
        <button class="rb-nav-btn ${this.currentView === 'shop' ? 'active' : ''}" data-view="shop">
          🏪 상점
        </button>
        <button class="rb-nav-btn ${this.currentView === 'inventory' ? 'active' : ''}" data-view="inventory">
          🎒 인벤토리
        </button>
        <button class="rb-nav-btn ${this.currentView === 'cart' ? 'active' : ''}" data-view="cart">
          🛒 장바구니
        </button>
      </div>
      
      <div class="rb-shop-content">
        ${this.renderCurrentView()}
      </div>
    `;
    
    this.attachEventListeners();
  }

  renderCurrentView() {
    switch(this.currentView) {
      case 'shop':
        return this.renderShop();
      case 'inventory':
        return this.renderInventory();
      case 'cart':
        return this.renderCart();
      default:
        return this.renderShop();
    }
  }

  renderShop() {
    const filteredProducts = this.currentCategory === 'all' 
      ? this.products 
      : this.products.filter(p => p.category === this.currentCategory);

    return `
      <div class="rb-shop-container">
        <div class="rb-category-filter">
          <button class="rb-category-btn ${this.currentCategory === 'all' ? 'active' : ''}" data-category="all">
            전체
          </button>
          <button class="rb-category-btn ${this.currentCategory === 'weapons' ? 'active' : ''}" data-category="weapons">
            ⚔️ 무기
          </button>
          <button class="rb-category-btn ${this.currentCategory === 'armor' ? 'active' : ''}" data-category="armor">
            🛡️ 방어구
          </button>
          <button class="rb-category-btn ${this.currentCategory === 'accessories' ? 'active' : ''}" data-category="accessories">
            💍 액세서리
          </button>
          <button class="rb-category-btn ${this.currentCategory === 'consumables' ? 'active' : ''}" data-category="consumables">
            🧪 소모품
          </button>
        </div>
        
        <div class="rb-products-grid">
          ${filteredProducts.map(product => this.renderProductCard(product)).join('')}
        </div>
      </div>
    `;
  }

  renderProductCard(product) {
    const rarityClass = `rb-rarity-${product.rarity}`;
    const canAfford = this.playerMoney >= product.price;
    const inCart = this.cart.some(item => item.id === product.id);
    
    return `
      <div class="rb-product-card ${rarityClass}" data-product-id="${product.id}">
        <div class="rb-product-icon">${product.icon}</div>
        <div class="rb-product-info">
          <h3 class="rb-product-name">${product.name}</h3>
          <p class="rb-product-description">${product.description}</p>
          <div class="rb-product-details">
            <span class="rb-product-price">${product.price.toLocaleString()}P</span>
            <span class="rb-product-stock">재고: ${product.stock}개</span>
          </div>
        </div>
        <div class="rb-product-actions">
          <button class="rb-add-cart-btn ${!canAfford ? 'disabled' : ''}" 
                  data-action="add-cart" 
                  data-product-id="${product.id}"
                  ${!canAfford ? 'disabled' : ''}>
            ${inCart ? '장바구니에 있음' : '장바구니에 추가'}
          </button>
        </div>
      </div>
    `;
  }

  renderInventory() {
    if (this.playerInventory.length === 0) {
      return `
        <div class="rb-empty-state">
          <h3>인벤토리가 비어있습니다</h3>
          <p>상점에서 아이템을 구매해보세요!</p>
        </div>
      `;
    }

    return `
      <div class="rb-inventory-container">
        <h3>보유 아이템</h3>
        <div class="rb-inventory-grid">
          ${this.playerInventory.map(item => this.renderInventoryItem(item)).join('')}
        </div>
      </div>
    `;
  }

  renderInventoryItem(item) {
    const product = this.products.find(p => p.id === item.id);
    if (!product) return '';

    return `
      <div class="rb-inventory-item">
        <div class="rb-item-icon">${product.icon}</div>
        <div class="rb-item-info">
          <h4>${product.name}</h4>
          <p>수량: ${item.quantity}</p>
        </div>
        <div class="rb-item-actions">
          <button class="rb-sell-btn" data-action="sell" data-product-id="${product.id}">
            판매 (${Math.floor(product.price * 0.7).toLocaleString()}P)
          </button>
        </div>
      </div>
    `;
  }

  renderCart() {
    if (this.cart.length === 0) {
      return `
        <div class="rb-empty-state">
          <h3>장바구니가 비어있습니다</h3>
          <p>상점에서 아이템을 선택해보세요!</p>
        </div>
      `;
    }

    const totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
    const canAfford = this.playerMoney >= totalPrice;

    return `
      <div class="rb-cart-container">
        <h3>장바구니</h3>
        <div class="rb-cart-items">
          ${this.cart.map(item => this.renderCartItem(item)).join('')}
        </div>
        <div class="rb-cart-summary">
          <div class="rb-total-price">
            총 금액: ${totalPrice.toLocaleString()}P
          </div>
          <div class="rb-cart-actions">
            <button class="rb-remove-all-btn" data-action="clear-cart">
              전체 삭제
            </button>
            <button class="rb-purchase-btn ${!canAfford ? 'disabled' : ''}" 
                    data-action="purchase" 
                    ${!canAfford ? 'disabled' : ''}>
              구매하기
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderCartItem(item) {
    return `
      <div class="rb-cart-item">
        <div class="rb-cart-item-info">
          <span class="rb-cart-item-name">${item.name}</span>
          <span class="rb-cart-item-price">${item.price.toLocaleString()}P</span>
        </div>
        <button class="rb-remove-item-btn" data-action="remove-cart" data-product-id="${item.id}">
          ❌
        </button>
      </div>
    `;
  }

  attachEventListeners() {
    this.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      const view = e.target.dataset.view;
      const category = e.target.dataset.category;
      const productId = parseInt(e.target.dataset.productId);
      
      if (view) {
        this.currentView = view;
        this.render();
        return;
      }
      
      if (category) {
        this.currentCategory = category;
        this.render();
        return;
      }
      
      switch(action) {
        case 'add-cart':
          this.addToCart(productId);
          break;
        case 'remove-cart':
          this.removeFromCart(productId);
          break;
        case 'clear-cart':
          this.clearCart();
          break;
        case 'purchase':
          this.purchaseItems();
          break;
        case 'sell':
          this.sellItem(productId);
          break;
      }
    });
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product || this.cart.some(item => item.id === productId)) return;
    
    this.cart.push({ ...product });
    this.render();
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.render();
  }

  clearCart() {
    this.cart = [];
    this.render();
  }

  purchaseItems() {
    const totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
    
    if (this.playerMoney < totalPrice) {
      alert('돈이 부족합니다!');
      return;
    }
    
    this.playerMoney -= totalPrice;
    this.savePlayerMoney(this.playerMoney); // localStorage에 포인트 저장
    
    // 구매한 아이템을 인벤토리에 추가
    this.cart.forEach(cartItem => {
      const existingItem = this.playerInventory.find(item => item.id === cartItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.playerInventory.push({ id: cartItem.id, quantity: 1 });
      }
    });
    
    this.cart = [];
    this.render();
    
    alert(`구매 완료! 총 ${totalPrice.toLocaleString()}P를 지불했습니다.`);
  }

  sellItem(productId) {
    const item = this.playerInventory.find(item => item.id === productId);
    if (!item) return;
    
    const product = this.products.find(p => p.id === productId);
    const sellPrice = Math.floor(product.price * 0.7);
    
    this.playerMoney += sellPrice;
    this.savePlayerMoney(this.playerMoney); // localStorage에 포인트 저장
    item.quantity--;
    
    if (item.quantity <= 0) {
      const index = this.playerInventory.indexOf(item);
      this.playerInventory.splice(index, 1);
    }
    
    this.render();
    alert(`${product.name}을(를) ${sellPrice.toLocaleString()}P에 판매했습니다.`);
  }
}

// 컴포넌트 등록
if (!customElements.get('rb-blackmarket-list')) {
  customElements.define('rb-blackmarket-list', BlackmarketList);
}

/***/ }),

/***/ 300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AF: () => (/* binding */ PLUGIN_NAME),
/* harmony export */   Oh: () => (/* binding */ RB_BUTTON_CLASSNAME),
/* harmony export */   rZ: () => (/* binding */ EXTERNAL_SCRIPTS)
/* harmony export */ });
/* unused harmony export PLUGIN_VERSION */
const PLUGIN_NAME = "Risu Blackmarket";
const PLUGIN_VERSION = "0.1";
const RB_BUTTON_CLASSNAME = "rb-button-appended";

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
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";

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

function injectStyles() {
  const style = document.createElement("style");
  style.textContent = STYLES;
  document.head.appendChild(style);
}

;// ./src/ui/components/menu-button.js
/**
 * 블랙마켓 메뉴 버튼 컴포넌트
 * RISU AI의 메뉴 영역에 표시되는 버튼
 */
  class RBMenuButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex items-center cursor-pointer hover:text-green-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- 페도라 모자 -->
          <ellipse cx="10" cy="7" rx="6" ry="1"></ellipse>
          <path d="M6 7 L7 4 C7 3 8 2 10 2 C12 2 13 3 13 4 L14 7"></path>
          
          <!-- 얼굴 -->
          <circle cx="10" cy="11" r="4"></circle>
          
          <!-- 선글라스 -->
          <line x1="7" y1="10" x2="13" y2="10" stroke-width="2"></line>
          <circle cx="8.5" cy="10" r="1" fill="currentColor"></circle>
          <circle cx="11.5" cy="10" r="1" fill="currentColor"></circle>
          
          <!-- 정장 -->
          <path d="M6 15 L7 17 M14 15 L13 17"></path>
          <line x1="10" y1="15" x2="10" y2="18"></line>
        </svg>
        <span class="ml-2">블랙마켓</span>
      </div>
    `;
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get("rb-menu-button")) {
  customElements.define("rb-menu-button", RBMenuButton);
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

// EXTERNAL MODULE: ./src/ui/components/blackmarket-list.js
var blackmarket_list = __webpack_require__(196);
;// ./src/index.js







// 메인 애플리케이션 클래스
class RisuBlackmarket {
  constructor() {
    this.risuAPI = null;
    this.observer = null;
    this.rtModuleBox = null;
    this.rtModuleBoxRoot = document.createElement("div");
    this.rtModuleBoxRoot.className = "rb-wrap";
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
          title: "Risu Blackmarket - 블랙마켓",
          x: "center",
          y: "center",
          width: "90%",
          height: "85%",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-resize", "no-max", "no-min", "rb-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        }
      : {
          title: "Risu Blackmarket - 블랙마켓",
          x: "center",
          y: "center",
          width: Math.min(1080, window.innerWidth * 0.9) + "px",
          height: Math.min(800, window.innerHeight * 0.8) + "px",
          mount: this.rtModuleBoxRoot,
          background: "#0f131a",
          class: ["no-full", "no-max", "no-min", "rb-box"],
          onclose: () => {
            this.rtModuleBox = null;
            location.hash = "";
          },
        };

    this.rtModuleBox = new WinBox(winboxConfig);
    location.hash = "#/game";
    this.render();
  }

  renderBlackmarketGame() {
    this.rtModuleBoxRoot.innerHTML = "";
    const gameEl = document.createElement("rb-blackmarket-list");
    this.rtModuleBoxRoot.appendChild(gameEl);
  }

  navigate(to) {
    if (location.hash !== `#${to}`) location.hash = to;
    else this.render();
  }

  render() {
    const hash = location.hash.slice(1); // '#' 제거

    if (!hash || hash === "/" || hash === "/game") {
      this.renderBlackmarketGame();
      return;
    }

    // 기본값: 암시장 목록
    this.renderBlackmarketGame();
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
    if (burgerEl && !burgerEl.classList.contains(constants/* RB_BUTTON_CLASSNAME */.Oh)) {
      const blackmarketButtonDiv = document.createElement("rb-menu-button");
      blackmarketButtonDiv.addEventListener("click", () => {
        this.openModuleBox();
      });
      burgerEl.appendChild(blackmarketButtonDiv);
      burgerEl.classList.add(constants/* RB_BUTTON_CLASSNAME */.Oh);
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
  const app = new RisuBlackmarket();
  await app.initialize();

  // 언로드 핸들러 등록
  if (globalThis.__pluginApis__?.onUnload) {
    globalThis.__pluginApis__.onUnload(() => {
      app.destroy();
    });
  }
})();

})();

RisuBlackmarket = __webpack_exports__;
/******/ })()
;