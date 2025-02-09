chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "OPEN_POPUP") {
    chrome.action.openPopup(); // This only works when the user has manually clicked the extension icon before
    sendResponse({ success: true });
  }
});
