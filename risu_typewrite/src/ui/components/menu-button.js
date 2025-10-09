/**
 * 타자 연습 메뉴 버튼 컴포넌트
 * RISU AI의 메뉴 영역에 표시되는 버튼
 */
export class RTMenuButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex items-center cursor-pointer hover:text-green-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- 키보드 본체 -->
          <rect x="2" y="7" width="16" height="8" rx="1.5"></rect>

          <!-- 키들 (간략화) -->
          <line x1="4" y1="9.5" x2="5.5" y2="9.5" stroke-width="1.5"></line>
          <line x1="7" y1="9.5" x2="8.5" y2="9.5" stroke-width="1.5"></line>
          <line x1="10" y1="9.5" x2="11.5" y2="9.5" stroke-width="1.5"></line>
          <line x1="13" y1="9.5" x2="14.5" y2="9.5" stroke-width="1.5"></line>

          <line x1="5" y1="11.5" x2="6.5" y2="11.5" stroke-width="1.5"></line>
          <line x1="8" y1="11.5" x2="9.5" y2="11.5" stroke-width="1.5"></line>
          <line x1="11" y1="11.5" x2="12.5" y2="11.5" stroke-width="1.5"></line>
          <line x1="14" y1="11.5" x2="15.5" y2="11.5" stroke-width="1.5"></line>

          <!-- 스페이스바 -->
          <line x1="6" y1="13.5" x2="14" y2="13.5" stroke-width="2"></line>
        </svg>
        <span class="ml-2">타자연습</span>
      </div>
    `;
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get("rt-menu-button")) {
  customElements.define("rt-menu-button", RTMenuButton);
}
