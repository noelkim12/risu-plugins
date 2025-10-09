/**
 * 블랙마켓 메뉴 버튼 컴포넌트
 * RISU AI의 메뉴 영역에 표시되는 버튼
 */
  export class RBMenuButton extends HTMLElement {
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
