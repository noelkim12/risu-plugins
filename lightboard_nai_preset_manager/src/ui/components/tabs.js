export class LnpmTabs extends HTMLElement {
  constructor() {
    super();
    this.tabs = [];
    this.activeTab = 0;
  }

  set config({ tabs = [], activeTab = 0, onChange }) {
    this.tabs = tabs;
    this.activeTab = activeTab;
    this.onChange = onChange;
    this.render();
  }

  connectedCallback() {
    this.className = "lnpm-tabs-container";
    this.render();
  }

  handleTabClick(index) {
    if (this.activeTab === index) return;

    this.activeTab = index;
    this.render();

    // 탭 변경 이벤트 발생
    if (this.onChange) {
      this.onChange(index);
    }

    this.dispatchEvent(new CustomEvent('tab-change', {
      detail: { index, tab: this.tabs[index] },
      bubbles: true,
    }));
  }

  render() {
    this.innerHTML = `
      <div class="lnpm-tabs">
        ${this.tabs.map((tab, index) => `
          <button
            class="lnpm-tab ${index === this.activeTab ? 'active' : ''}"
            data-index="${index}"
          >
            ${tab.icon ? `<span class="lnpm-tab-icon">${tab.icon}</span>` : ''}
            <span class="lnpm-tab-label">${tab.label}</span>
          </button>
        `).join('')}
      </div>
    `;

    // 탭 클릭 이벤트 리스너 추가
    this.querySelectorAll('.lnpm-tab').forEach((tabEl) => {
      tabEl.addEventListener('click', (e) => {
        const index = parseInt(e.currentTarget.dataset.index);
        this.handleTabClick(index);
      });
    });
  }
}
