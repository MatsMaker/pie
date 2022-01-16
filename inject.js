var s = document.createElement('script');
s.src = chrome.runtime.getURL('js/edit-tool.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
