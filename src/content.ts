const getProductImage = (): string | null => {
  const imgElement = document.querySelector("#landingImage") as HTMLImageElement;  
  return imgElement ? imgElement.src : null;
};

if (window.location.href.includes("amazon.in")) {  // Check for Amazon India
  const imageUrl = getProductImage();
  if (imageUrl) {
    console.log("Extracted Image URL:", imageUrl);  // Debugging log
    chrome.storage.local.set({ productImage: imageUrl });
    chrome.runtime.sendMessage({ type: "IMAGE_FOUND", imageUrl });
  } else {
    console.log("No image found.");
  }
}
