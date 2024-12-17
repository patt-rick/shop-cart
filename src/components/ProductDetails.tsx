import { PackagePlus, X } from "lucide-react";
import React from "react";
import { useCart } from "../context/CartContext";
import { Product } from "../types";
import NumberControl from "./NumberControl";

interface ProductDetailsProps {
    product: Product;
    onClose: () => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
    const { state, dispatch } = useCart();
    const cartItem = state.items.find((item) => item.product.id === product.id);

    return (
        <div
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold">{product.name}</h2>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full"
                            aria-label="Close details"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                    />

                    <p className="text-gray-600 mb-4">{product.description}</p>

                    <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">GHS {product.price.toFixed(2)}</span>

                        {cartItem ? (
                            <NumberControl id={product.id} quantity={cartItem.quantity} />
                        ) : (
                            <button
                                onClick={() => dispatch({ type: "ADD_ITEM", payload: product })}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                            >
                                <PackagePlus className="w-4 h-4 mr-2" /> Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
