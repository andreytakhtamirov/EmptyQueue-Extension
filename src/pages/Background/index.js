import Mellowtel from "mellowtel";
import { CONFIGURATION_KEY } from "../../constants";

let mellowtel;

(async () => {
    mellowtel = new Mellowtel(CONFIGURATION_KEY);
    await mellowtel.initBackground();
})();

chrome.runtime.onInstalled.addListener(async function (details) {
    console.log("Extension Installed or Updated");
    if (details.reason === "install") {
        const uninstallURl = await mellowtel.generateFeedbackLink();
        chrome.runtime.setUninstallURL(uninstallURl);
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SAVE_LAST_QUEUE_EVENT") {
        const { lastEmptyQueueEvent } = message.data;
        const lastSyncTime = new Date().toLocaleString();

        chrome.storage.local.set({
            lastEmptyQueueEvent,
            lastSyncTime
        }, () => {
            console.log("Data and sync time saved.");
        });


        sendResponse({ status: "success", message: "Data saved successfully." });
    }
});
