(function () {
    const interceptFetch = () => {
        const nativeFetch = window.fetch.bind(window);
        window.fetch = async function (...args) {
            const response = await nativeFetch(...args);
            if (args[0].includes("/internal/logged_in_user")) {
                response.clone().json().then(responseBody => {
                    window.postMessage({
                        type: "INTERCEPTED_DATA",
                        data: responseBody,
                    }, "*");
                });
            }
            return response;
        };
    };

    interceptFetch();
})();