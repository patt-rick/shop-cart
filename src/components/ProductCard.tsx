import React from "react";
import { Product } from "../types";
import { Info, PackagePlus } from "lucide-react";
import { useCart } from "../context/CartContext";
import NumberControl from "./NumberControl";

interface ProductCardProps {
    product: Product;
    onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
    const { state, dispatch } = useCart();
    const cartItem = state.items.find((item) => item.product.id === product.id);

    return (
        <button
            onClick={() => onViewDetails(product)}
            aria-label={`View details for ${product.name}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden transition-transform  flex flex-col  justify-between "
        >
            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48  object-cover hover:scale-110 transition-transform"
            />
            <div className="p-4 text-left">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between my-4">
                    <span className="text-xl font-bold">GHS {product.price.toFixed(2)}</span>
                    <div className="space-x-2">
                        <button
                            className="px-3 py-1 text-sm text-gray-800 rounded-md hover:underline transition-colors flex items-center"
                            aria-label={`View details for ${product.name}`}
                        >
                            <Info className="w-4 h-4 mr-2" />
                            Details
                        </button>
                    </div>
                </div>
                {cartItem && cartItem.quantity > 0 ? (
                    <div className="flex justify-end">
                        <NumberControl id={product.id} quantity={cartItem.quantity} />
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: "ADD_ITEM", payload: product });
                        }}
                        className=" py-2 px-4 w-full font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center
                    "
                        aria-label={`Add ${product.name} to cart`}
                    >
                        <PackagePlus className="w-4 h-4 mr-2" /> Add to Cart
                    </button>
                )}
            </div>
        </button>
    );
};
