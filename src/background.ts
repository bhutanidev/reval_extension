chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "OPEN_POPUP") {
      chrome.action.openPopup();
    }
  });
  