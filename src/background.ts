chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "IMAGE_FOUND") {
        console.log("Image URL:", message.imageUrl);
        // Here, you can integrate a reverse image search API
    }
});
