const url = window.location.hostname;
chrome.runtime.sendMessage({
  type: 'urlFetch',
  url
});