import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState<{ imageUrl: string; name: string; price: string; productUrl: string } | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  // Load product details and recommendations from Chrome storage when popup opens
  useEffect(() => {
    chrome.storage.local.get(["productDetails", "recommendations"], (result) => {
      if (result.productDetails) {
        setProduct(result.productDetails);
      }
      if (result.recommendations) {
        // Map API response to expected structure
        const formattedRecommendations = result.recommendations.map((item: any) => ({
          imageUrl: item.img_link, // Correct key mapping
          name: item.product_name,
          price: item.price,
          productUrl: `https://www.amazon.com/dp/${item.product_id}`, // Create proper Amazon URL
        }));
        setRecommendations(formattedRecommendations);
      }
    });

    // Listen for storage changes and update the UI automatically
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.productDetails?.newValue) {
        setProduct(changes.productDetails.newValue);
      }
      if (changes.recommendations?.newValue) {
        const formattedRecommendations = changes.recommendations.newValue.map((item: any) => ({
          imageUrl: item.img_link,
          name: item.product_name,
          price: item.price,
          productUrl: `https://www.amazon.com/dp/${item.product_id}`,
        }));
        setRecommendations(formattedRecommendations);
      }
    });
  }, []);

  return (
    <div className="w-[350px] bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold">Amazon Product Details</h2>

      {/* Display Product Details */}
      {product ? (
        <div className="mt-3">
        </div>
      ) : (
        <p></p>
      )}

      {/* Display Recommendations */}
      {recommendations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">Similar Products:</h3>
          <ul>
            {recommendations.map((item, index) => (
              <li key={index} className="mt-2 p-2 border rounded flex items-center space-x-3">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-sm text-green-600">{item.price}</p>
                  {/* <a href={item.productUrl} target="_blank" className="text-blue-500 text-xs">View Product</a> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
