import { useEffect, useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch stored image URL from local storage
    chrome.storage.local.get(["productImage"], (result) => {
      if (result.productImage) {
        setImageUrl(result.productImage);
        console.log(result.productImage);
        
      }
    });
  }, []);

  return (
    <div className="w-80 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-gray-800">Extracted Product Image</h2>

      {imageUrl ? (
        <img src={imageUrl} alt="Product" className="w-full mt-3 rounded-lg shadow-md" />
      ) : (
        <p className="text-gray-600 mt-2">No image found. Please visit an Amazon product page.</p>
      )}
    </div>
  );
}

export default App;
