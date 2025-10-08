export class LnpmToolbar extends HTMLElement {
  constructor() {
    super();
    this._title = "";
    this._leftButtons = [];
    this._rightButtons = [];
  }

  set config({ title = "", left = [], right = [] }) {
    this._title = title;
    this._leftButtons = left;
    this._rightButtons = right;
    this.render();
  }

  connectedCallback() {
    this.className = "lnpm-toolbar";
    this.render();
  }

  render() {
    this.innerHTML = "";

    const leftBox = document.createElement("div");
    for (const b of this._leftButtons)
      leftBox.appendChild(this.createButton(b));

    const titleEl = document.createElement("div");
    titleEl.className = "lnpm-title";
    titleEl.textContent = this._title;

    const spacer = document.createElement("div");
    spacer.className = "lnpm-spacer";

    const rightBox = document.createElement("div");
    for (const b of this._rightButtons)
      rightBox.appendChild(this.createButton(b));

    this.appendChild(leftBox);
    this.appendChild(titleEl);
    this.appendChild(spacer);
    this.appendChild(rightBox);
  }

  createButton({ label, onClick }) {
    const el = document.createElement("button");
    el.className = "lnpm-btn";
    el.textContent = label;
    el.onclick = onClick;
    return el;
  }
}
