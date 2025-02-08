// import { useEffect, useState } from "react";

interface Product {
  imageUrl: string;
  name: string;
  price: string;
  productUrl: string;
}

const sampleProducts:Product[] = [
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Wireless Bluetooth Headphones",
    price: "₹2,999",
    productUrl: "https://example.com/product/headphones"
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Smart Fitness Band",
    price: "₹1,499",
    productUrl: "https://example.com/product/fitness-band"
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "4K Smart LED TV",
    price: "₹45,999",
    productUrl: "https://example.com/product/smart-tv"
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Gaming Laptop - RTX 4060",
    price: "₹89,999",
    productUrl: "https://example.com/product/gaming-laptop"
  },
  {
    imageUrl: "https://via.placeholder.com/150",
    name: "Noise-Cancelling Earbuds",
    price: "₹3,499",
    productUrl: "https://example.com/product/earbuds"
  }
];

// Store sample data in Chrome Storage (for testing)
chrome.storage.local.set({ productDetails: sampleProducts }, () => {
  console.log("Sample product data stored successfully!");
});


function App() {
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   // Fetch stored product details from local storage
  //   chrome.storage.local.get(["productDetails"], (result) => {
  //     if (result.productDetails) {
  //       setProducts(result.productDetails);
  //       console.log("Loaded Products:", result.productDetails);
  //     }
  //   });
  // }, []);

  return (
    <div className="w-96 p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-bold text-gray-800">Recommended Products</h2>

      {sampleProducts.length > 0 ? (
        <div className="grid gap-4 mt-3">
          {sampleProducts.map((product, index) => (
            <div key={index} className="border p-3 rounded-lg shadow-md bg-gray-100">
              <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded-md" />
              <h3 className="text-md font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
              <a
                href={product.productUrl}
                target="_blank"
                className="mt-2 block bg-blue-500 text-white text-center py-1 rounded-md hover:bg-blue-600"
              >
                View Product
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-2">No product details found.</p>
      )}
    </div>
  );
}

export default App;
