const THRESHOLD_VALUE = 3;

function updateIcon(value = 0) {
    let backgroundColor = {color:[190, 190, 190, 230]};
    if (value > THRESHOLD_VALUE) {
        backgroundColor = {color: 'red'};
    } else if (value > 0) {
        backgroundColor = {color: 'green'};
    }

    //
    let valueStr = String(value > 99 ? '99+' : value);

    chrome.browserAction.setBadgeBackgroundColor(backgroundColor);
    chrome.browserAction.setBadgeText({text:`${value}`});
}

window.logs = [];

if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(() => {
        console.log('starting browser...');
        updateIcon();
    });
}

chrome.runtime.onMessage.addListener((message) => {
    if (message && message.type === 'logMessage') {
        const data = message.data;
        updateIcon(Math.ceil(data.duration / 1000));
        logs.push(data);
    } else if (message && message.type === 'clearMessage') {
        logs = [];
        updateIcon(0);
    }
});