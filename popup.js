const root = document.getElementById('root');
const ulContainer = document.createElement('table');
ulContainer.className = 'tabledata';
root.appendChild(ulContainer);

const parseTimestamp = (timestamp) => {
    return moment(timestamp).fromNow();
}

const clearContent = () => {
    urlContainer.innerHTML = '';
}

const render = (logs) => {
    // add headers
    const th = document.createElement('tr');
    th.innerHTML = `<th>Event name</th><th>Duration</th><th>Details</th>`;
    ulContainer.appendChild(th);

    logs.reverse().forEach((log) => {
        const tr = document.createElement('tr');
        const className = log.duration > log.threshold * 1000 ? 'red' : 'green';
        tr.innerHTML = `<td>${log.subtype}</td>
                        <td class="${className}">${log.duration.toFixed()}&nbsp;ms</td>
                        <td>${parseTimestamp(log.timestamp)}</td>`;
        ulContainer.appendChild(tr)
    });
};

chrome.storage.local.get('logs', (logs) => {
    render(logs.logs);
});

document.getElementById("button").addEventListener("click", () => {
    chrome.runtime.sendMessage({
        type: 'clearMessage'
    });
    clearContent();
});