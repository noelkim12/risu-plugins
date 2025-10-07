//@name Handdam Edit Plugin
//@display-name Handdam Edit Plugin_v0.6
//@version 0.6
//@description Handdam Edit Plugin for RISU AI

// ----------------------------------------------------------------
// LBI 긴빠이
const pluginApis = globalThis.__pluginApis__;
const risuAPI = {
  risuFetch: pluginApis.risuFetch,
  nativeFetch: pluginApis.nativeFetch,
  getArg: pluginApis.getArg,
  getChar: pluginApis.getChar,
  setChar: pluginApis.setChar,
  addProvider: pluginApis.addProvider,
  addRisuScriptHandler: pluginApis.addRisuScriptHandler,
  removeRisuScriptHandler: pluginApis.removeRisuScriptHandler,
  addRisuReplacer: pluginApis.addRisuReplacer,
  removeRisuReplacer: pluginApis.removeRisuReplacer,
  onUnload: pluginApis.onUnload,
  setArg: pluginApis.setArg,
  getDatabase: null,
};
{
  try {
    risuAPI.getDatabase = eval("getDatabase");
  } catch (error) {}
}

// auto title 플러그인 버그패치 긴빠이
if (globalThis.__pluginApis__ && globalThis.__pluginApis__.setArg) {
  const originalSetArg = globalThis.__pluginApis__.setArg;
  globalThis.__pluginApis__.setArg = function (arg, value) {
    if (typeof arg !== "string") {
      return;
    }
    return originalSetArg.call(this, arg, value);
  };
}
(async () => {
  let intersectionObserver = null;
  let mutationObserver = null;
  let createdButtons = [];

  const { getChar, onUnload } = globalThis.__pluginApis__;

  // CSS 스타일 추가
  const style = document.createElement("style");
  style.textContent = `
    .hddm-btn-appended:hover {
      outline: 1px solid rgba(100, 100, 100, 0.2);
      outline-offset: 2px;
    }
    .hddm-button-wrapper {
      position: absolute;
      top: inherit;
      left: -30px;
      transform: translateY(-100%);
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 1000;
      display: flex;
      gap: 4px;
      padding: 4px 0;
      pointer-events: auto;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
    .hddm-edit-button {
      background: rgba(255, 255, 255, 0.65);
      border: 1px solid rgba(0, 0, 0, 0.15);
      padding: 4px 4px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      line-height: 1;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }
  `;
  document.head.appendChild(style);

  
  // 버튼 래퍼 생성
  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "hddm-button-wrapper";

  // 편집 버튼 생성
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerHTML = "✏️";
  editButton.title = "수정";
  editButton.className = "chat-modi-btn hddm-edit-button";

  const TARGET_SELECTOR =
    "span.text p, span.text li, div.x-risu-regex-quote-block, div.x-risu-regex-thought-block, div.x-risu-regex-sound-block, div.x-risu-message, div.x-risu-lb-nai-character-tags, div.x-risu-lb-nai-comp-tags";

  /**
   * TARGET_SELECTOR를 활용한 요소 검증 함수
   */
  function isTargetElement(element) {
    if (!element || !element.classList) return false;

    // TARGET_SELECTOR를 파싱하여 동적으로 패턴 생성
    const selectors = TARGET_SELECTOR.split(", ").map((selector) =>
      selector.trim()
    );

    for (const selector of selectors) {
      if (matchesSelector(element, selector)) {
        return true;
      }
    }

    // 추가 검증: className에 "message"가 포함된 경우
    if (element.className && element.className.includes("message")) {
      return true;
    }

    return false;
  }

  /**
   * CSS Selector 매칭 함수
   */
  function matchesSelector(element, selector) {
    try {
      // 간단한 선택자 매칭 로직
      const parts = selector.split(" ");
      const lastPart = parts[parts.length - 1];

      // 태그명과 클래스명 추출
      const tagMatch = lastPart.match(/^(\w+)/);
      const classMatch = lastPart.match(/\.([\w-]+)/);

      if (!tagMatch) return false;

      const tagName = tagMatch[1];
      const className = classMatch ? classMatch[1] : null;

      // 태그명 검증
      if (element.tagName.toLowerCase() !== tagName) return false;

      // 클래스명 검증
      if (className && !element.classList.contains(className)) return false;

      // 부모 요소 검증 (span.text p, span.text li의 경우)
      if (parts.length > 1) {
        const parentSelector = parts.slice(0, -1).join(" ");
        const parentElement = element.parentElement;

        if (
          parentElement &&
          !matchesParentSelector(parentElement, parentSelector)
        ) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Parent Selector 매칭 함수
   */
  function matchesParentSelector(element, parentSelector) {
    try {
      // span.text 같은 부모 선택자 매칭
      const parts = parentSelector.split(".");
      const tagName = parts[0];
      const className = parts[1];

      if (element.tagName.toLowerCase() !== tagName) return false;
      if (className && !element.classList.contains(className)) return false;

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * 부모 요소들의 overflow를 visible로 변경 (3계층까지)
   * @returns 변경된 요소들과 원래 값을 저장한 배열
   */
  function setParentOverflowVisible(element) {
    const changedElements = [];
    let current = element.parentElement;
    let depth = 0;

    while (current && depth < 1) {
      // span.text 체크 - 탐색 중지
      if (
        current.tagName &&
        current.tagName.toLowerCase() === "span" &&
        current.classList.contains("text")
      ) {
        break;
      }

      const currentOverflow = window.getComputedStyle(current).overflow;
      if (currentOverflow !== "visible") {
        changedElements.push({
          element: current,
          originalOverflow: current.style.overflow || "",
        });
        current.style.overflow = "visible";
      }

      current = current.parentElement;
      depth++;
    }

    return changedElements;
  }

  /**
   * overflow 속성 복원
   */
  function restoreOverflow(changedElements) {
    changedElements.forEach(({ element, originalOverflow }) => {
      if (originalOverflow === "") {
        element.style.removeProperty("overflow");
      } else {
        element.style.overflow = originalOverflow;
      }
    });
  }

  /**
   * 단일 Element에 편집 버튼 추가
   */
  function addEditButtonToElement(element) {
    // 텍스트 내용 확인 (button.x-risu-button-default 제외)
    const tempElement = element.cloneNode(true);
    const risuButtons = tempElement.querySelectorAll("button");
    risuButtons.forEach((btn) => btn.remove());
    const textContent = tempElement.textContent.trim();

    // 텍스트가 없으면 hddm-btn-appended만 추가하고 종료
    if (!textContent) {
      element.classList.add("hddm-btn-appended");
      return;
    }

    // 요소 자체를 relative로 설정
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    // wrapper와 button 클론 생성
    const wrapperClone = buttonWrapper.cloneNode(true);
    const buttonClone = editButton.cloneNode(true);
    buttonClone.onclick = () => editSingleChat(buttonClone);

    // button을 wrapper에 추가
    wrapperClone.appendChild(buttonClone);

    // overflow 제어를 위한 저장소
    let changedOverflows = [];

    // 마우스 호버 이벤트 추가 (wrapper의 opacity 제어 + overflow 변경)
    element.addEventListener("mouseenter", () => {
      // changedOverflows = setParentOverflowVisible(element);
      wrapperClone.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapperClone.style.opacity = "0";
      // restoreOverflow(changedOverflows);
      // changedOverflows = [];
    });

    // wrapper를 요소에 추가
    element.appendChild(wrapperClone);
    createdButtons.push(wrapperClone);

    // classList에 hddm-btn-appended 추가
    element.classList.add("hddm-btn-appended");
  }

  /**
   * HTML을 편집 가능한 특수 포맷으로 변환
   * <ruby>텍스트<rt>루비</rt></ruby> → :텍스트[루비]:
   * <br> → 줄바꿈
   */
  function convertHTMLToEditFormat(element) {
    const cloned = element.cloneNode(true);

    // 버튼들 제거
    const buttons = cloned.querySelectorAll(
      "button, .chat-modi-btn, .x-risu-button-default"
    );
    buttons.forEach((btn) => btn.remove());

    let result = "";

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();

        if (tagName === "ruby") {
          const baseText = Array.from(node.childNodes)
            .filter(
              (n) =>
                n.nodeType === Node.TEXT_NODE ||
                (n.nodeType === Node.ELEMENT_NODE &&
                  n.tagName.toLowerCase() !== "rt")
            )
            .map((n) => n.textContent)
            .join("");

          const rtNode = node.querySelector("rt");
          const rubyText = rtNode ? rtNode.textContent : "";

          return `:${baseText}[${rubyText}]:`;
        } else if (tagName === "br") {
          return "";
        } else {
          return Array.from(node.childNodes).map(processNode).join("");
        }
      }
      return "";
    }

    result = processNode(cloned);
    return result.trim();
  }

  /**
   * 편집 포맷을 HTML로 변환
   * :텍스트[루비]: → <ruby>텍스트<rt>루비</rt></ruby>
   */
  function convertEditFormatToHTML(text) {
    // :텍스트[루비]: 패턴을 <ruby> 태그로 변환
    let result = text.replace(
      /:([^\[\]:]+)\[([^\]]+)\]:/g,
      "<ruby>$1<rt>$2</rt></ruby>"
    );

    // 줄바꿈을 <br>로 변환
    result = result.replace(/\n/g, "<br>\n");

    return result;
  }

  /**
   * 요소가 현재 화면에 보이는지 확인하는 함수
   */
  function isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);

    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      style.opacity !== "0" &&
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  /**
   * 편집모드 전환
   */
  function editSingleChat(element) {
    // editButton 클릭 시 해당 요소를 감싸고 있는 li 혹은 p태그를 textarea로 변경 후, 편집 모드로 전환
    // textarea에는 현재 대화의 id가 포함되어야 함
    // 가장 가까운 .chat-message-container 를 찾아서, 그 안의 div에서 data-chat-index, data-chat-id를 찾아서 textarea에 data attribute로 추가  }
    // textarea 하단에는 save 버튼과 cancel 버튼 추가
    // save 버튼 클릭 시 saveSingleChat 함수 호출
    // cancel 버튼 클릭 시 textarea 제거 및 p태그 혹은 li태그로 원상복구

    // 편집 버튼의 부모 요소 (p 또는 li) 찾기
    const targetElement = element.closest(
      "p, li, div.x-risu-regex-quote-block, div.x-risu-regex-thought-block, div.x-risu-regex-sound-block, div.x-risu-message, div.x-risu-lb-nai-character-tags, div.x-risu-lb-nai-comp-tags"
    );
    if (!targetElement) return;

    // 이미 편집 모드인지 확인
    if (targetElement.classList.contains("hddm-editing")) return;

    element.remove();

    // 현재 텍스트 내용 저장 (버튼 제외)
    const tempElement = targetElement.cloneNode(true);
    // 편집 버튼들과 기타 버튼들 제거
    const buttons = tempElement.querySelectorAll(
      "button, .chat-modi-btn, .x-risu-button-default"
    );
    buttons.forEach((btn) => btn.remove());

    // HTML을 편집 가능한 포맷으로 변환 (:텍스트[루비]: 형식)
    const originalText = convertHTMLToEditFormat(targetElement);

    // 원본 HTML 구조 보존 (버튼 제외)
    const originalHTML = tempElement.innerHTML;

    // 가장 가까운 .chat-message-container 찾기
    const chatContainer = targetElement.closest(".chat-message-container");
    let chatIndex = "";
    let chatId = "";

    if (chatContainer) {
      const dataDiv = chatContainer.querySelector(
        "div[data-chat-index], div[data-chat-id]"
      );
      if (dataDiv) {
        chatIndex = dataDiv.getAttribute("data-chat-index") || "";
        chatId = dataDiv.getAttribute("data-chat-id") || "";
      }
    }

    // 편집 모드 표시
    targetElement.classList.add("hddm-editing");

    // 기존 요소의 실제 화면 크기 가져오기
    const rect = targetElement.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(targetElement);
    const actualWidth = rect.width + 10;
    const actualHeight = Math.max(rect.height + 10, 60); // 최소 60px 보장

    // textarea 생성
    const textarea = document.createElement("textarea");
    textarea.value = originalText;
    textarea.setAttribute("data-chat-index", chatIndex);
    textarea.setAttribute("data-chat-id", chatId);
    textarea.className = "chat-edit-textarea";
    textarea.style.cssText = `
      width: ${actualWidth}px;
      height: ${actualHeight}px;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-family: inherit;
      font-size: inherit;
      color: #000;
      resize: vertical;
      margin: 4px 0;
      box-sizing: border-box;
    `;

    // 버튼 컨테이너 생성
    const buttonContainer = document.createElement("div");
    buttonContainer.className = "chat-edit-buttons";
    buttonContainer.style.cssText = `
      display: flex;
      gap: 8px;
      margin-top: 8px;
    `;

    // Save 버튼
    const saveButton = document.createElement("button");
    saveButton.textContent = "저장";
    saveButton.className = "chat-save-btn";
    saveButton.style.cssText = `
      padding: 6px 12px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `;
    saveButton.onclick = () =>
      saveSingleChat(textarea, targetElement, originalText, originalHTML);

    // Cancel 버튼
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "취소";
    cancelButton.className = "chat-cancel-btn";
    cancelButton.style.cssText = `
      padding: 6px 12px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    `;
    cancelButton.onclick = () =>
      cancelEdit(targetElement, originalText, originalHTML);

    // 버튼들을 컨테이너에 추가
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    // 원본 요소의 내용을 textarea와 버튼으로 교체
    targetElement.innerHTML = "";
    targetElement.appendChild(textarea);
    targetElement.appendChild(buttonContainer);

    // textarea에 포커스
    textarea.focus();
    textarea.select();
  }

  /**
   * 편집모드 저장
   * @param {*} textarea
   * @param {*} targetElement
   * @param {*} originalText - 편집 포맷 텍스트 (:텍스트[루비]:)
   * @param {*} originalHTML - 원본 HTML 구조
   * @returns
   */
  function saveSingleChat(textarea, targetElement, originalText, originalHTML) {
    const newText = textarea.value;

    if (newText === originalText) {
      // 변경사항이 없으면 편집 모드만 종료
      cancelEdit(targetElement, originalText, originalHTML);
      return;
    }

    // 변경사항이 있으면 저장 처리
    let chatId = textarea.getAttribute("data-chat-id");
    let chatIndex = textarea.getAttribute("data-chat-index");

    // 편집 포맷을 HTML로 변환
    const newHTML = convertEditFormatToHTML(newText);

    // 전체 메시지 데이터에서 원본 HTML을 새 HTML로 교체
    let oldFullText =
      getChar().chats[getChar().chatPage].message[chatIndex].data;
    oldFullText = oldFullText.replaceAll(originalText, newText);
    getChar().chats[getChar().chatPage].message[chatIndex].data = oldFullText;
    // 여기에 실제 저장 로직을 구현할 수 있습니다

    // 편집 모드 종료 및 새 HTML로 업데이트
    targetElement.classList.remove("hddm-editing");
    targetElement.innerHTML = newHTML;

    // 편집 버튼 다시 추가
    appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 모드 취소 함수
   */
  function cancelEdit(targetElement, originalText, originalHTML) {
    // 편집 모드 종료
    targetElement.classList.remove("hddm-editing");

    // 원본 HTML 구조로 복원
    targetElement.innerHTML = originalHTML;

    // 편집 버튼 다시 추가
    appendEditButtonToElement(targetElement);
  }

  /**
   * 편집 버튼을 요소에 다시 추가하는 헬퍼 함수
   */
  function appendEditButtonToElement(element) {
    // 요소 자체를 relative로 설정
    if (getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    // wrapper와 button 클론 생성
    const wrapperClone = buttonWrapper.cloneNode(true);
    const buttonClone = editButton.cloneNode(true);
    buttonClone.onclick = () => editSingleChat(buttonClone);

    // button을 wrapper에 추가
    wrapperClone.appendChild(buttonClone);

    // overflow 제어를 위한 저장소
    let changedOverflows = [];

    // 마우스 호버 이벤트 추가 (wrapper의 opacity 제어 + overflow 변경)
    element.addEventListener("mouseenter", () => {
      // changedOverflows = setParentOverflowVisible(element);
      wrapperClone.style.opacity = "1";
    });

    element.addEventListener("mouseleave", () => {
      wrapperClone.style.opacity = "0";
      // restoreOverflow(changedOverflows);
      // changedOverflows = [];
    });

    // wrapper를 요소에 추가
    element.appendChild(wrapperClone);
    createdButtons.push(wrapperClone);
  }

  // SPA 화면 전환 감지를 위한 변수
  let currentUrl = location.href;
  let reinitTimeout = null;

  // 옵저버 재설정
  function reinitializeObservers() {
    // 기존 타임아웃 취소
    if (reinitTimeout) clearTimeout(reinitTimeout);

    // Observer 재설정
    if (intersectionObserver) {
      intersectionObserver.disconnect();
    }
    if (mutationObserver) {
      mutationObserver.disconnect();
    }

    // 짧은 지연 후 재초기화 (DOM 렌더링 대기)
    reinitTimeout = setTimeout(() => {
      startObserver();
    }, 300);
  }

  /**
   * 옵저버 시작
   */
  function startObserver() {
    if (intersectionObserver) intersectionObserver.disconnect();
    if (mutationObserver) mutationObserver.disconnect();

    intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소가 화면에 보일 때 편집 버튼 추가
            setTimeout(() => {
              const element = entry.target;
              if (
                isElementVisible(element) &&
                !element.classList.contains("hddm-btn-appended")
              ) {
                addEditButtonToElement(element);
              }
            }, 100);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // 기존 요소들에 대해 IntersectionObserver 적용
    const existingContainers = document.querySelectorAll(TARGET_SELECTOR);
    existingContainers.forEach((container) => {
      intersectionObserver.observe(container);
    });

    // 새로운 요소 감지를 위한 MutationObserver (IntersectionObserver와 함께 사용)
    mutationObserver = new MutationObserver((mutations) => {
      let shouldReinitialize = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // 대규모 DOM 변경 감지 (SPA 화면 전환)
          if (
            mutation.addedNodes.length > 5 ||
            mutation.removedNodes.length > 5
          ) {
            shouldReinitialize = true;
          }

          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              try {
                // TARGET_SELECTOR를 활용한 동적 검증
                if (node?.classList && isTargetElement(node)) {
                  intersectionObserver.observe(node);
                }
              } catch (error) {}
              try {
                // 하위 요소들도 확인
                const childContainers = node.querySelectorAll(TARGET_SELECTOR);
                childContainers.forEach((container) => {
                  intersectionObserver.observe(container);
                });
              } catch (error) {}
            }
          });
        }
      });

      // 대규모 변경 감지 시 재초기화
      if (shouldReinitialize) {
        reinitializeObservers();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  // History API 감지 (SPA 라우팅)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function (...args) {
    originalPushState.apply(this, args);
    reinitializeObservers();
  };

  history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    reinitializeObservers();
  };

  // popstate 이벤트 감지 (뒤로가기/앞으로가기)
  window.addEventListener("popstate", () => {
    reinitializeObservers();
  });

  // URL 변경 감지 (폴링 방식 백업)
  setInterval(() => {
    if (currentUrl !== location.href) {
      currentUrl = location.href;
      reinitializeObservers();
    }
  }, 1000);

  onUnload(() => {
    // Observer 정리
    if (intersectionObserver) intersectionObserver.disconnect();
    if (mutationObserver) mutationObserver.disconnect();

    // 타임아웃 정리
    if (reinitTimeout) clearTimeout(reinitTimeout);

    // History API 복원
    history.pushState = originalPushState;
    history.replaceState = originalReplaceState;

    // 버튼 래퍼 제거
    document
      .querySelectorAll(".hddm-button-wrapper")
      .forEach((wrapper) => wrapper.remove());
    createdButtons.forEach((wrapper) => wrapper?.remove());

    // CSS 스타일 제거
    if (style && style.parentNode) {
      style.parentNode.removeChild(style);
    }

    console.log("Chat Modi 플러그인이 언로드되었습니다.");
  });
  startObserver();
})();