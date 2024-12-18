import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { ShippingForm } from "./ShippingForm";
import { OrderSummary } from "./OrderSummary";
import { ShoppingCart, X } from "lucide-react";
import { validateEmail, validateRequired } from "../../utils";

interface FormData {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    zipCode: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

interface FormErrors {
    [key: string]: string | null;
}

export const CheckoutForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { state } = useCart();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [loading, setLoading] = React.useState(false);

    const validateShippingForm = (): boolean => {
        const newErrors: FormErrors = {
            email: validateEmail(formData.email),
            firstName: validateRequired(formData.firstName, "First name"),
            lastName: validateRequired(formData.lastName, "Last name"),
            address: validateRequired(formData.address, "Address"),
            city: validateRequired(formData.city, "City"),
            zipCode: validateRequired(formData.zipCode, "ZIP code"),
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error !== null);
    };

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateShippingForm()) {
            handlePaymentSubmit(e);
        }
    };

    const handlePaymentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            alert("Order placed successfully!");
            onClose();
        } catch (error) {
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold flex text-blue-700">
                            <ShoppingCart className="w-6 h-6 mr-2 text-black" />
                            Checkout
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                            aria-label="Close checkout"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <ShippingForm
                                loading={loading}
                                formData={formData}
                                setFormData={setFormData}
                                errors={errors}
                                onSubmit={handleShippingSubmit}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <OrderSummary items={state.items} total={state.total} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
