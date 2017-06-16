window.__SYMPHONY_PERFORMANCE_LOGS_MONITORING__ = (payload) => {
    document.dispatchEvent(new CustomEvent('PERFORMANCE_LOG_CHROME_EXTENSION_EVENT', { detail: payload }));
};