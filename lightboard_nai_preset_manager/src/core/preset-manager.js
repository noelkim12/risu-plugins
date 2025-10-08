/**
 * @description Preset Manager
 * @param {ModuleManager} moduleManager
 */
export class PresetManager {
  /**
   * @description Constructor
   * @param {ModuleManager} moduleManager
   */
  constructor(moduleManager) {
    this.moduleManager = moduleManager;
    /**
     * @description Presets
     * @type {Array}
     * @example [
     *  {
     *    id: 0,
     *    comment: "프리셋 1",
     *    content: "[author] ... [quality] ... [negative] ...", 
     *    author: "프리셋 1",
     *    quality: "프리셋 1",
     *    negative: "프리셋 1"
     *  }
     * ]
     */
    this.presets = [];
  }

  /**
   * @description Initialize
   * @returns {boolean}
   */
  initialize() {
    const naiModule = this.moduleManager.getNaiModule();
    if (!naiModule) return false;

    const lorebook = naiModule.lorebook;
    this.presets = lorebook.map((item, index) => {
      item.id = index;
      return item;
    }).filter(item => item.comment.includes("프리셋"));

    this.presets.forEach(preset => {
      preset.author = preset.content.split("[Author] ")[1].split("[")[0].trim();
      preset.quality = preset.content.split("[Quality] ")[1].split("[")[0].trim();
      preset.negative = preset.content.split("[Negative] ")[1].split("[")[0].trim();
    });

    return true;
  }

  getPresets() {
    this.initialize();
    return this.presets;
  }

  getPresetById(id) {
    this.initialize();
    return this.presets.find(preset => preset.id == id);
  }

  updatePreset(id, field, value) {
    const preset = this.getPresetById(id);
    if (!preset) return false;

    preset[field] = value;
    preset.content = this.buildContent(preset.author, preset.quality, preset.negative);

    // NAI 모듈의 lorebook 업데이트
    const naiModule = this.moduleManager.getNaiModule();
    if (naiModule) {
      const lorebookItem = naiModule.lorebook[preset.id];
      if (lorebookItem) {
        lorebookItem.content = preset.content;
      }
    }

    return true;
  }

  buildContent(author, quality, negative) {
    return `[Author] ${author.trim()} \n[Quality] ${quality.trim()} \n[Negative] ${negative.trim()}`;
  }
}
