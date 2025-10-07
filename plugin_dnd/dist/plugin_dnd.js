//@name PLUGIN DRAG N DROP_v0.1
//@display-name PLUGIN DRAG N DROP_v0.1
//@version 0.1
//@description Plugin Drag N Drop for RISU AI
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
        globalThis.__pluginApis__.getDatabase = risuAPI.getDatabase;
        globalThis.__pluginApis__.setDatabaseLite = risuAPI.setDatabaseLite;
        globalThis.__pluginApis__.loadPlugins = risuAPI.loadPlugins;
        globalThis.__pluginApis__.language = risuAPI.language;
        globalThis.__pluginApis__.alertError = risuAPI.alertError;
        globalThis.__pluginApis__.alertMd = risuAPI.alertMd;
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

    language = risuAPI.language;
    alertError = risuAPI.alertError;
    alertMd = risuAPI.alertMd;
    getDatabase = risuAPI.getDatabase;
    setDatabaseLite = risuAPI.setDatabaseLite;
    loadPlugins = risuAPI.loadPlugins;

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

                    setTimeout(() => {
                        getDatabase()?.plugins?.push(pluginData);
                        setDatabaseLite(getDatabase());
                        loadPlugins();
                    }, 1000);
                }
            });
        }
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
    }

    risuAPI.onUnload(() => {
        if (observer) observer.disconnect();
        console.log("[PLUGIN DRAG N DROP] plugin unloaded");
    });
    startObserver();
})();

(() => {
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
})();
