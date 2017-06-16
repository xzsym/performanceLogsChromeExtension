document.addEventListener('PERFORMANCE_LOG_CHROME_EXTENSION_EVENT', (e) => {
    chrome.runtime.sendMessage({
        type: 'logMessage',
        data: e.detail
    });
});

// inject the script into document body to set global variable.
let s = document.createElement('script');
s.type = 'text/javascript';

s.src = chrome.extension.getURL('inject.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
