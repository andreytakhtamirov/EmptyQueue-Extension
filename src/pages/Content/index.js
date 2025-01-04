function sendCsrfToken() {
    const csrf = document.cookie.split(';').find(c => c.trim().startsWith('_csrf='));
    let c = "NONE";
    if (csrf) {
        c = csrf.split('=')[1];
    }

    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
        try {
            chrome.runtime.sendMessage({
                type: "USER_HEADER",
                data: c,
            });
        } catch (error) {
            // Silently catch any errors
        }
    }
}

document.addEventListener("DOMContentLoaded", sendCsrfToken);
