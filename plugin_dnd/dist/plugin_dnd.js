//@name PLUGIN DRAG N DROP
//@display-name PLUGIN DRAG N DROP_v0.2
//@version 0.2
//@description Plugin Drag N Drop for RISU AI
//@args devMode int
const PLUGIN_NAME = "PLUGIN DRAG N DROP";
const PLUGIN_VERSION = "v0.1";
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
    setDatabaseLite: null,
    loadPlugins: null,
    language: null,
    alertError: null,
    alertMd: null,
};

let accepted = false;

{
    try {
        risuAPI.getDatabase = eval("getDatabase");
        risuAPI.setDatabaseLite = eval("setDatabaseLite");
        risuAPI.loadPlugins = eval("loadPlugins");
        risuAPI.language = eval("language");
        risuAPI.alertError = eval("alertError");
        risuAPI.alertMd = eval("alertMd");
        accepted = true;
    } catch (error) {
        console.log("[RisuAPI] Failed to add getDatabase:", error);
    }
}
(async () => {
    if (!accepted) {
        console.log("[PLUGIN DRAG N DROP] plugin not loaded..");
        return;
    }
    let observer = null;

    console.log("[PLUGIN DRAG N DROP] plugin loaded");

    let language = risuAPI.language;
    let alertError = risuAPI.alertError;
    let alertMd = risuAPI.alertMd;
    let getDatabase = risuAPI.getDatabase;
    let setDatabaseLite = risuAPI.setDatabaseLite;
    let loadPlugins = risuAPI.loadPlugins;

    const IS_DEV_MODE = risuAPI.getArg("PLUGIN DRAG N DROP::devMode") == 1;

    function attachToggleOnPlugins(dropZone) {
        [...dropZone.querySelectorAll("span.font-bold.flex-grow")].forEach(_pluginTitleEl => {
            let _pluginTitleDiv = _pluginTitleEl.parentElement;
            let _pluginNextEl = _pluginTitleDiv.nextElementSibling;
            
            if ( !_pluginNextEl || _pluginNextEl?.classList?.contains("seperator") ) return;

            let _pluginDndToggle = document.createElement("plugin-dnd-toggle");
            _pluginTitleEl.innerHTML = `${_pluginDndToggle.outerHTML} ${_pluginTitleEl.innerHTML}`;
            _pluginTitleEl.style.cursor = "pointer";
            _pluginNextEl.style.display = "none";
            
            // 토글 상태 추적을 위한 속성 추가
            _pluginTitleEl.setAttribute("data-toggle-state", "closed");
            
            _pluginTitleEl.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const toggleState = _pluginTitleEl.getAttribute("data-toggle-state");
                
                if (toggleState === "closed") {
                    _pluginNextEl.style.display = "";
                    _pluginTitleEl.setAttribute("data-toggle-state", "open");
                } else {
                    _pluginNextEl.style.display = "none";
                    _pluginTitleEl.setAttribute("data-toggle-state", "closed");
                }
            });
        })
    }

    async function appendPluginDND() {
        const xpath = '//h2[text()="플러그인"]';
        const targetH2 = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (targetH2) {
            let dropZone = targetH2.parentElement;
            if (!dropZone || dropZone.classList.contains("plugin-dnd-drop-zone"))
                return;

            dropZone.classList.add("plugin-dnd-drop-zone");

            attachToggleOnPlugins(dropZone);

            attachEventOnElement(dropZone);
        }
    }

    async function attachEventOnElement(dropZone) {
        // 이벤트 중복 처리 방지
        dropZone.removeEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.classList.add("dragover");
        });
        dropZone.removeEventListener("dragleave", (event) => {
            dropZone.classList.remove("dragover");
        });
        dropZone.removeEventListener("drop", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            dropZone.classList.remove("dragover");
        });

        dropZone.addEventListener("dragover", (event) => {
            event.preventDefault();
            dropZone.classList.add("dragover");
        });

        dropZone.addEventListener("dragleave", (event) => {
            dropZone.classList.remove("dragover");
        });

        // DROP 이벤트 처리
        dropZone.addEventListener("drop", async (event) => {
            event.preventDefault();
            event.stopPropagation();
            dropZone.classList.remove("dragover");

            // 드롭된 파일 정보 - event.dataTransfer.files
            const files = event.dataTransfer.files;

            if (files.length === 1) {
                const file = files[0];
                console.log("드롭된 파일:", file);
                console.log("이름:", file.name);
                console.log("크기:", file.size, "bytes");
                console.log("타입:", file.type);

                const f = {
                    name: file.name,
                    data: await readFileAsUint8Array(file)
                };

                const jsFile = Buffer.from(f.data)
                    .toString("utf-8")
                    .replace(/^\uFEFF/gm, "");
                const splitedJs = jsFile.split("\n");

                let name = "";
                let displayName = undefined;
                let arg = {};
                let realArg = {};
                let customLink = [];

                for (const line of splitedJs) {
                    if (line.startsWith("//@risu-name")) {
                        alertMd(
                            "V1 plugin is not supported anymore, please use V2 plugin instead. for more information, please check the documentation. `https://github.com/kwaroran/RisuAI/blob/main/plugins.md`"
                        );
                        return;
                    }
                    if (line.startsWith("//@risu-display-name")) {
                        alertMd(
                            "V1 plugin is not supported anymore, please use V2 plugin instead. for more information, please check the documentation. `https://github.com/kwaroran/RisuAI/blob/main/plugins.md`"
                        );
                        return;
                    }
                    if (line.startsWith("//@name")) {
                        const provied = line.slice(7);
                        if (provied === "") {
                            alertError(
                                "plugin name must be longer than 0, did you put it correctly?"
                            );
                            return;
                        }
                        name = provied.trim();
                    }
                    if (line.startsWith("//@display-name")) {
                        const provied = line.slice("//@display-name".length + 1);
                        if (provied === "") {
                            alertError(
                                "plugin display name must be longer than 0, did you put it correctly?"
                            );
                            return;
                        }
                        displayName = provied.trim();
                    }

                    if (line.startsWith("//@link")) {
                        const link = line.split(" ")[1];
                        if (!link || link === "") {
                            alertError("plugin link is empty, did you put it correctly?");
                            return;
                        }
                        if (!link.startsWith("https")) {
                            alertError(
                                "plugin link must start with https, did you check it?"
                            );
                            return;
                        }
                        const hoverText = line.split(" ").slice(2).join(" ").trim();
                        if (hoverText === "") {
                            // OK, no hover text. It's fine.
                            customLink.push({
                                link: link,
                                hoverText: undefined,
                            });
                        } else
                            customLink.push({
                                link: link,
                                hoverText: hoverText || undefined,
                            });
                    }
                    if (line.startsWith("//@risu-arg") || line.startsWith("//@arg")) {
                        const provied = line.trim().split(" ");
                        if (provied.length < 3) {
                            alertError(
                                "plugin argument is incorrect, did you put space in argument name?"
                            );
                            return;
                        }
                        const provKey = provied[1];

                        if (provied[2] !== "int" && provied[2] !== "string") {
                            alertError(
                                `plugin argument type is "${provied[2]}", which is an unknown type.`
                            );
                            return;
                        }
                        if (provied[2] === "int") {
                            arg[provKey] = "int";
                            realArg[provKey] = 0;
                        } else if (provied[2] === "string") {
                            arg[provKey] = "string";
                            realArg[provKey] = "";
                        }
                    }
                }

                if (name.length === 0) {
                    alertError("plugin name not found, did you put it correctly?");
                    return;
                }

                let pluginData = {
                    name: name,
                    script: jsFile,
                    realArg: realArg,
                    arguments: arg,
                    displayName: displayName,
                    version: 2,
                    customLink: customLink,
                };

                let oldPlugin = getDatabase().plugins.filter(_plugin => _plugin.name == name);
                console.log(oldPlugin,oldPlugin.length, oldPlugin.length > 0, name);
                if (oldPlugin?.length > 0) {
                    await alertMd(`${name} 플러그인이 이미 설치되어 있습니다. 기존 플러그인을 덮어씁니다.`);
                }
                // 이름겹치는 플러그인 제거
                getDatabase().plugins = getDatabase().plugins.filter(_plugin => _plugin.name !== name);
                // 제거 후 새로운 플러그인 추가
                getDatabase().plugins.push(pluginData);
                // DB 저장
                setDatabaseLite(getDatabase());

                // 플러그인 로드
                setTimeout(() => {
                    alertMd(`${name} 플러그인이 설치되었습니다.`);
                    loadPlugins();
                }, 1000);
            }
        });
    }

    async function readFileAsUint8Array(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const buffer = event.target.result;
                const uint8Array = new Uint8Array(buffer);
                resolve(uint8Array);
            };

            reader.onerror = (error) => {
                console.log("error", error);
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    function startObserver() {
        if (observer) observer.disconnect();
        observer = new MutationObserver(() => {
            setTimeout(appendPluginDND, 100);
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
        setTimeout(appendPluginDND, 500);
        
        if (IS_DEV_MODE) {
            attachEventOnElement(document.querySelector("main div"));
        }
    }

    risuAPI.onUnload(() => {
        if (observer) observer.disconnect();
        console.log("[PLUGIN DRAG N DROP] plugin unloaded");
    });
    startObserver();
})();

(() => {
    let CE = globalThis.customElements || customElements;
    const style = document.createElement("style");
    style.textContent = `
        .plugin-dnd-drop-zone {
            border: 2px dashed #ccc;
            border-radius: 8px;
            padding: 40px;
            color: #ccc;
            font-family: sans-serif;
            transition: all 0.2s ease;
            pointer-events: auto !important;
            position: relative;
        }
        .plugin-dnd-drop-zone.dragover {
            border-color: #3399ff;
            background-color: #2a2a2a;
        }
    `;
    document.head.appendChild(style);

    class PluginDNDToggle extends HTMLElement {
        constructor() {
            super(); // 항상 맨 처음에 호출해야 함
    
            this.TOGGLE_ON_SVG = `
            <svg style="display:inline;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="5,7 10,12 15,7"></polyline>
            </svg>`;
            
            this.TOGGLE_OFF_SVG = `
            <svg style="display:inline;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="5,13 10,8 15,13"></polyline>
            </svg>`;
    
            this.addEventListener("click", () => {
                if (this.isToggledOn) {
                    this.innerHTML = this.TOGGLE_OFF_SVG;
                } else {
                    this.innerHTML = this.TOGGLE_ON_SVG;
                }
                this.isToggledOn = !this.isToggledOn;
            });
        }
    
        connectedCallback() {
            this.isToggledOn = true;
            this.innerHTML = this.TOGGLE_ON_SVG;
        }
    }

    CE.get("plugin-dnd-toggle") || CE.define("plugin-dnd-toggle", PluginDNDToggle);
})();
