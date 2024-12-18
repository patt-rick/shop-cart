import { CreditCard, Loader } from "lucide-react";
import React from "react";

interface ShippingFormProps {
    formData: any;
    setFormData: (data: any) => void;
    errors: any;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}

export const ShippingForm: React.FC<ShippingFormProps> = ({
    formData,
    setFormData,
    errors,
    onSubmit,
    loading,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-2 outline-none rounded-md p-2  ${
                            errors.email ? "border-red-500" : ""
                        }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-2 outline-none rounded-md p-2 ${
                            errors.firstName ? "border-red-500" : ""
                        }`}
                    />
                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-2 outline-none rounded-md p-2 ${
                            errors.lastName ? "border-red-500" : ""
                        }`}
                    />
                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                    )}
                </div>
            </div>

            <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full border-2 outline-none rounded-md p-2 ${
                        errors.address ? "border-red-500" : ""
                    }`}
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-2 outline-none rounded-md p-2 ${
                            errors.city ? "border-red-500" : ""
                        }`}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>

                <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        ZIP Code
                    </label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`mt-1 block w-full border-2 outline-none rounded-md p-2 ${
                            errors.zipCode ? "border-red-500" : ""
                        }`}
                    />
                    {errors.zipCode && (
                        <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                    )}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    disabled={loading}
                    type="submit"
                    className="flex bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    {loading ? (
                        <Loader className="w-6 h-6 mr-2 animate-spin" />
                    ) : (
                        <CreditCard className="w-6 h-6 mr-2" />
                    )}
                    Continue to Payment
                </button>
            </div>
        </form>
    );
};
