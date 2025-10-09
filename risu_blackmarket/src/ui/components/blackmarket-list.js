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