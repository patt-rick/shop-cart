import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { Product } from "./types";
import { products } from "./data/products";
import { ProductCard } from "./components/ProductCard";
import { ProductDetails } from "./components/ProductDetails";
import { Cart } from "./components/Cart";
import { SearchBar } from "./components/SearchBar";
import { ShoppingBag } from "lucide-react";

function App() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center text-blue-600">
                                <ShoppingBag className="mr-2" />
                                <h1 className="text-2xl font-bold text-blue-900 hidden sm:block">
                                    Cart
                                </h1>
                            </div>
                            <div className="">
                                <SearchBar value={searchQuery} onChange={setSearchQuery} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onViewDetails={setSelectedProduct}
                            />
                        ))}
                    </div>
                </main>

                <Cart />

                {selectedProduct && (
                    <ProductDetails
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </div>
        </CartProvider>
    );
}

export default App;
