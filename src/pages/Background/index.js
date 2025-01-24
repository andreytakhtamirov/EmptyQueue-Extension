import { OUTLIER_SITE_URL } from "../../constants";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "USER_HEADER") {
        writeQueueData(message.data);
        sendResponse({ status: "success", message: "Data saved successfully." });
    }
});

async function writeQueueData(header) {
    const response = await makeRequest(header);
    const lastEmptyQueueEvent = response ? response.lastEmptyQueueEvent : null;
    const lastSyncTime = new Date().toLocaleString();

    if (lastEmptyQueueEvent != null) {
        chrome.storage.local.set({
            lastEmptyQueueEvent: lastEmptyQueueEvent,
            lastSyncTime: lastSyncTime
        }, () => {
            console.log("Data and sync time saved.");
        });
    } else {
        chrome.storage.local.remove(['lastEmptyQueueEvent', 'lastSyncTime']);
    }
}

async function makeRequest(header) {
    try {
        const response = await fetch(`${OUTLIER_SITE_URL}/internal/logged_in_user`, {
            method: 'GET',
            headers: {
                'X-CSRF-Token': header,
                'Accept': 'application/json',
            },
        });

        return await response.json();

    } catch (error) {
        console.error("Error during fetch:", error);
        return null;
    }
}
