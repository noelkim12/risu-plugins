export class LnpmFormPage extends HTMLElement {
  static get observedAttributes() {
    return ["author", "quality", "negative", "preset-id"];
  }

  constructor() {
    super();
    this.presetManager = null;
    this.presetId = null;
    this.activeTab = 0;
  }

  set config({ moduleBox, presetManager, presetId }) {
    this.moduleBox = moduleBox;
    this.presetManager = presetManager;
    this.presetId = presetId;
    this.render();
  }

  connectedCallback() {
    this.className = "lnpm-page";
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && name !== "preset-id") {
      this.render();
    }
  }

  handleTabChange(index) {
    this.activeTab = index;
    this.renderTabContent();
  }

  attachEventListeners() {
    const fields = ["author", "quality", "negative"];

    fields.forEach(field => {
      const textarea = this.querySelector(`#${field}`);
      if (textarea) {
        // input 이벤트는 keydown, keypress, paste, cut 등 모든 입력을 포괄
        textarea.addEventListener("input", (e) => {
          this.handleFieldChange(field, e.target.value);
        });

        // blur 이벤트로 포커스 해제 시에도 업데이트 (안전장치)
        textarea.addEventListener("blur", (e) => {
          this.handleFieldChange(field, e.target.value);
        });
      }
    });
    this.querySelector("#lnpm-btn-save").addEventListener("click", () => {
      this.moduleBox.close();
    });
    this.querySelector("#lnpm-btn-close").addEventListener("click", () => {
      this.moduleBox.close();
    });
  }

  handleFieldChange(field, value) {
    if (!this.presetManager || this.presetId === null) {
      console.warn("[LnpmFormPage] presetManager or presetId not set");
      return;
    }

    const success = this.presetManager.updatePreset(this.presetId, field, value);
    if (success) {
      console.log(`[LnpmFormPage] Updated ${field} for preset ${this.presetId}`);
    } else {
      console.error(`[LnpmFormPage] Failed to update ${field}`);
    }
  }

  renderPromptTab() {
    const author = this.getAttribute("author") || "";
    const quality = this.getAttribute("quality") || "";
    const negative = this.getAttribute("negative") || "";

    return `
      <div class="lnpm-prompt-tab">
        <div class="lnpm-field">
          <label for="author">Author</label>
          <textarea id="author" rows="4" placeholder="artist:...">${author}</textarea>
        </div>
        <div class="lnpm-field">
          <label for="quality">Quality</label>
          <textarea id="quality" rows="4" placeholder="8k, masterpiece, ultra-detailed">${quality}</textarea>
        </div>
        <div class="lnpm-field">
          <label for="negative">Negative</label>
          <textarea id="negative" rows="4" placeholder="lowres, blurry, extra fingers">${negative}</textarea>
        </div>
        <div class="lnpm-btn-container">
          <button id="lnpm-btn-save" class="lnpm-btn-save">저장</button>
          <button id="lnpm-btn-close" class="lnpm-btn-close">닫기</button>
        </div>
      </div>
    `;
  }

  renderPreviewTab() {
    return `<lnpm-preview-tab id="preview-tab"></lnpm-preview-tab>`;
  }

  renderTabContent() {
    const tabContent = this.querySelector('.lnpm-tab-content');
    if (!tabContent) return;

    if (this.activeTab === 0) {
      tabContent.innerHTML = this.renderPromptTab();
      this.attachEventListeners();
    } else {
      tabContent.innerHTML = this.renderPreviewTab();
      const previewTab = this.querySelector('#preview-tab');
      if (previewTab) {
        previewTab.config = { presetId: this.presetId };
      }
    }
  }

  render() {
    this.innerHTML = `
      <lnpm-tabs id="form-tabs"></lnpm-tabs>
      <div class="lnpm-tab-content"></div>
    `;

    // 탭 설정
    const tabsEl = this.querySelector('#form-tabs');
    if (tabsEl) {
      tabsEl.config = {
        tabs: [
          { label: '프롬프트', icon: '📝' },
          { label: '미리보기', icon: '🖼️' },
        ],
        activeTab: this.activeTab,
        onChange: (index) => this.handleTabChange(index),
      };
    }

    // 초기 탭 콘텐츠 렌더링
    this.renderTabContent();
  }
}
