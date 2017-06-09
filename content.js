document.addEventListener('PERFORMANCE_LOG_CHROME_EXTENSION_EVENT', (e) => {
    chrome.runtime.sendMessage({
        type: 'logMessage',
        data: e.detail
    });
});