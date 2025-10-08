import { ALLOWED_NAMESPACE_ARRAY } from '../constants.js';

export class ModuleManager {
  constructor(risuAPI) {
    this.risuAPI = risuAPI;
    this.modules = risuAPI.getDatabase().modules;
    this.lbNaiModuleIdx = -1;
    this.lbNaiModule = null;
    this.lbWanModuleIdx = -1;
    this.lbWanModule = null;
  }

  initialize() {
    this.modules.forEach((module, index) => {
      if (ALLOWED_NAMESPACE_ARRAY.includes(module.namespace)) {
        switch (module.namespace) {
          case "lightboard-NAI":
            this.lbNaiModuleIdx = index;
            this.lbNaiModule = module;
            break;
          case "lightboard-WAN":
            this.lbWanModuleIdx = index;
            this.lbWanModule = module;
            break;
        }
      }
    });

    return this.lbNaiModuleIdx !== -1;
  }

  getNaiModule() {
    return this.lbNaiModule;
  }

  getWanModule() {
    return this.lbWanModule;
  }
}
