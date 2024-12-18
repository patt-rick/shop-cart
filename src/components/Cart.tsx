import { PackageCheck, ShoppingCart, X } from "lucide-react";
import React from "react";
import { useCart } from "../context/CartContext";
import NumberControl from "./NumberControl";
import { CheckoutForm } from "./checkout/CheckoutForm";

export const Cart: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
    const { state } = useCart();

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Open cart"
            >
                <ShoppingCart className="w-6 h-6" />
                {state.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                        {state.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                )}
            </button>

            {isOpen && (
                <div
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setIsOpen(false);
                        }
                    }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
                >
                    <div className="bg-white w-full max-w-md h-full flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h2 className="text-xl font-bold">Shopping Cart</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                aria-label="Close cart"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {state.items.length === 0 ? (
                                <p className="text-gray-500 text-center">Your cart is empty</p>
                            ) : (
                                <div className="space-y-4">
                                    {state.items.map((item) => (
                                        <div
                                            key={item.product.id}
                                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 space-x-4 bg-gray-50 p-4 rounded-lg"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-semibold">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        GHS {item.product.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-end w-full pr-3 sm:pr-0 sm:w-fit">
                                                <NumberControl
                                                    quantity={item.quantity}
                                                    id={item.product.id}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-4 border-t">
                            <div className="flex justify-between items-center mb-4">
                                <span className="font-semibold">Total:</span>
                                <span className="text-xl font-bold">
                                    GHS {state.total.toFixed(2)}
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    setIsCheckoutOpen(true);
                                    setIsOpen(false);
                                }}
                                className="flex justify-center items-center w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={state.items.length === 0}
                            >
                                <PackageCheck className="w-6 h-6 mr-2" />
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isCheckoutOpen && <CheckoutForm onClose={() => setIsCheckoutOpen(false)} />}
        </>
    );
};
