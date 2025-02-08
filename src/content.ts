// Function to extract product details from the Amazon product page
const getProductDetails = () => {
  const imgElement = document.querySelector("#landingImage") as HTMLImageElement;
  const nameElement = document.querySelector("#productTitle") as HTMLElement;
  const priceElement = document.querySelector(".a-price .a-offscreen") as HTMLElement;

  return {
    imageUrl: imgElement ? imgElement.src : "https://via.placeholder.com/150",
    name: nameElement ? nameElement.innerText.trim() : "No Title Found",
    price: priceElement ? priceElement.innerText.trim() : "Price Not Available",
    productUrl: window.location.href
  };
};

// Function to inject the "Check for Similar Products" button near the product title
const injectButton = () => {
  // Check if the button already exists
  if (document.getElementById("checkSimilarBtn")) return;

  const titleElement = document.querySelector("#titleSection") || document.querySelector("#productTitle");
  if (!titleElement) return;

  // Create button
  const button = document.createElement("button");
  button.id = "checkSimilarBtn";
  button.innerText = "Check for Similar Products";
  button.style.cssText = `
    background: #ff9900;
    color: white;
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    margin-top: 5px;
  `;

  // Button Click Event
  button.addEventListener("click", () => {
    const productDetails = getProductDetails();
    
    chrome.storage.local.set({ productDetails: [productDetails] }, () => {
      console.log("Product details saved!", productDetails);

      // Automatically open the extension popup
      chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
    });
  });

  // Insert the button next to the product title
  titleElement.appendChild(button);
};

// Run the script only on Amazon product pages
if (window.location.href.includes("amazon.")) {
  injectButton();
}
