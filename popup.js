const root = document.getElementById('root');
const ulContainer = document.createElement('table');
ulContainer.className = 'tabledata';

// add headers
const th = document.createElement('tr');
th.innerHTML = `<th>Event name</th><th>Duration</th><th>Details</th>`;
ulContainer.appendChild(th);

// add table
root.appendChild(ulContainer);

const parseTimestamp = (timestamp) => {
    return moment(timestamp).fromNow();
}

const clearContent = () => {
    urlContainer.innerHTML = '';
}

const logs = chrome.extension.getBackgroundPage().logs || [];

logs.reverse().forEach((log) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${log.subtype}</td>
                    <td>${log.duration.toFixed()}&nbsp;ms</td>
                    <td>${parseTimestamp(log.timestamp)}</td>`;
    ulContainer.appendChild(tr)
});

document.getElementById("button").addEventListener("click", () => {
    chrome.runtime.sendMessage({
        type: 'clearMessage'
    });
    clearContent();
});