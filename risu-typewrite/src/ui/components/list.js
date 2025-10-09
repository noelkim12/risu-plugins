import { getPresetImages } from '../../utils/image-storage.js';

export class LnpmList extends HTMLElement {
  constructor() {
    super();
    this._presets = [];
    this._onNavigate = null;
    this._tooltip = null;
  }

  set data({ presets = [], onNavigate }) {
    this._presets = presets;
    this._onNavigate = onNavigate;
    this.render();
  }

  connectedCallback() {
    this.className = "lnpm-list";
    this.addEventListener("click", this.handleClick.bind(this));
    this.addEventListener("mouseover", this.handleMouseOver.bind(this));
    this.addEventListener("mouseout", this.handleMouseOut.bind(this));
  }

  handleClick(e) {
    this.hideTooltip();
    const el = e.target.closest(".lnpm-item");
    if (!el || !this._onNavigate) return;
    this._onNavigate(el.dataset.id);
  }

  async handleMouseOver(e) {
    const el = e.target.closest(".lnpm-item");
    if (!el) return;

    const presetId = parseInt(el.dataset.id);
    const images = await getPresetImages(presetId);

    if (images && images.length > 0) {
      this.showTooltip(el, images);
    }
  }

  handleMouseOut(e) {
    const el = e.target.closest(".lnpm-item");
    if (!el) return;
    this.hideTooltip();
  }

  showTooltip(target, images) {
    this.hideTooltip();

    this._tooltip = document.createElement('div');
    this._tooltip.className = 'lnpm-tooltip';

    const imageElements = images.map(img => {
      const url = URL.createObjectURL(img.blob);
      return `<img src="${url}" alt="${img.fileName}" />`;
    }).join('');

    this._tooltip.innerHTML = imageElements;

    document.body.appendChild(this._tooltip);

    const rect = target.getBoundingClientRect();
    this._tooltip.style.top = `${rect.top}px`;
    this._tooltip.style.left = `${rect.right + 10}px`;
  }

  hideTooltip() {
    if (this._tooltip) {
      // Revoke blob URLs to free memory
      this._tooltip.querySelectorAll('img').forEach(img => {
        URL.revokeObjectURL(img.src);
      });
      this._tooltip.remove();
      this._tooltip = null;
    }
  }

  render() {
    this.innerHTML = this._presets
      .map(
        (p) => `
          <div class="lnpm-item" data-id="${p.id}">
            <div>${p.comment}</div>
          </div>
        `
      )
      .join("");
  }
}
