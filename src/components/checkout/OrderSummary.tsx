import React from "react";
import { CartItem } from "../../types";

interface OrderSummaryProps {
    items: CartItem[];
    total: number;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total }) => {
    const shipping = 0; // Free shipping
    const tax = total * 0.1; // 10% tax
    const finalTotal = total + shipping + tax;

    return (
        <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

            <div className="space-y-4">
                {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                        <span className="flex-1">
                            {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                            &#8373; {(item.product.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span className="font-medium">&#8373; {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Tax (10%)</span>
                    <span className="font-medium">&#8373; {tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="border-t mt-4 pt-4">
                <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-lg">&#8373;{finalTotal.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
