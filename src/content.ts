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
const injectButton = () => {
  if (document.getElementById("checkSimilarBtn")) return;

  const titleElement = document.querySelector("#titleSection") || document.querySelector("#productTitle");
  if (!titleElement) return;

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
  button.addEventListener("click", async () => {
    const productDetails = getProductDetails();

    try {
      // Call API to get recommendations
      const response = await fetch("https://extension-hacktu.onrender.com/recommend_image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ img_url: productDetails.imageUrl })
      });

      const data = await response.json();

      // Store product details & recommendations in storage
      chrome.storage.local.set({ 
        productDetails: productDetails, 
        recommendations: data.recommendations 
      }, () => {
        console.log("Data saved in storage!", { productDetails, recommendations: data.recommendations });

        // Ask background script to open popup
        chrome.runtime.sendMessage({ type: "OPEN_POPUP" });
      });

    } catch (error) {
      console.error("API Error:", error);
    }
  });

  titleElement.appendChild(button);
};

// Inject button only on Amazon product pages
if (window.location.href.includes("amazon.")) {
  injectButton();
}