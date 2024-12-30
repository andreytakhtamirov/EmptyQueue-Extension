import Mellowtel from "mellowtel";
import { CONFIGURATION_KEY } from "../../constants";

(async () => {
    const mellowtel = new Mellowtel(CONFIGURATION_KEY);
    await mellowtel.initContentScript();
})();

document.addEventListener("DOMContentLoaded", () => {
    const injectScript = () => {
        // Create a script element and inject the script into the page
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL("injected.bundle.js");
        (document.head || document.documentElement).appendChild(script);

        script.onload = () => script.remove(); // Clean up after execution

        window.addEventListener("message", (event) => {
            if (event.source !== window || event.data.type !== "INTERCEPTED_DATA") {
                return;
            }

            const interceptedData = event.data.data;

            if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
                try {
                    // Try sending the message
                    chrome.runtime.sendMessage({
                        type: "SAVE_INTERCEPTED_DATA",
                        data: interceptedData,
                    });
                } catch (error) {
                    // Silently catch any errors
                }
            }
        });


    };

    injectScript();
});
