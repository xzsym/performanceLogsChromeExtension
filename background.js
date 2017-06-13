const THRESHOLD_VALUE = 3;

function updateIcon(value = 0, thresholdValue = THRESHOLD_VALUE) {
    let backgroundColor = {color:[190, 190, 190, 230]};
    if (value > thresholdValue) {
        backgroundColor = {color: 'red'};
    } else if (value > 0) {
        backgroundColor = {color: 'green'};
    }

    //
    let valueStr = String(value > 99 ? '99+' : value);

    chrome.browserAction.setBadgeBackgroundColor(backgroundColor);
    chrome.browserAction.setBadgeText({text:`${value}`});
}

const logs = [];

if (chrome.runtime && chrome.runtime.onStartup) {
    chrome.runtime.onStartup.addListener(() => {
        console.log('starting browser...');
        updateIcon();
    });
}

const getThresholdValue = (log) => {
    switch(log.subtype) {
        case 'bootstrap':
            return 6;
        case 'initialization':
            return 5;
        case 'update_conversation':
        case 'send_message':
        case 'switch_channel':
        case 'switch_mentions':
        case 'get_search_result':
            return 2;
        case 'layout_rendered':
            return 9;
        default:
            return THRESHOLD_VALUE;
    }
};

chrome.runtime.onMessage.addListener((message) => {
    if (message && message.type === 'logMessage') {
        const data = message.data;
        updateIcon(Math.ceil(data.duration / 1000), getThresholdValue(data));
        logs.push(data);

        // save it to local storage
        chrome.storage.local.set({ logs, })

    } else if (message && message.type === 'clearMessage') {
        logs = [];
        updateIcon(0);

        // clear local storage value
        chrome.storage.local.set({ logs, });
    }
});