'use client';
import { GiTakeMyMoney } from "react-icons/gi";

export default function UserSalaryForm({
    formData,
    handleChange,
    handleSubmit,
}: Readonly<{
    formData: {
        name: string;
        email: string;
        local_currency_amount: string;
        local_currency_code: string;
    };
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}>) {


    return (
        <div className=" bg-white w-full md:max-w-md mx-auto">
            {/* Header with icon and title */}
            <div className="flex justify-center font-bold mb-4 bg-blue-900 text-white space-x-2 px-8 py-12">
                <GiTakeMyMoney className="text-3xl" />
                <h2 className="text-2xl">Salary Details</h2>
            </div>

            {/* Form for user salary input */}
            <form onSubmit={handleSubmit} className="px-6 pb-12 pt-4">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 text-sm font-semibold" htmlFor="name">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 text-sm font-semibold" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-600"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 text-sm font-semibold" htmlFor="local_currency_amount">
                        Salary Amount:
                    </label>
                    <input
                        type="number"
                        id="local_currency_amount"
                        name="local_currency_amount"
                        value={formData.local_currency_amount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-600"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-700 mb-1 text-sm font-semibold" htmlFor="local_currency_code">
                        Currency Code:
                    </label>
                    <select
                        id="local_currency_code"
                        name="local_currency_code"
                        value={formData.local_currency_code}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-600"
                        required
                    >
                        <option value="EUR">EUR (Euro)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="GBP">GBP (British Pound)</option>
                        {/* Add more currencies as needed */}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 border-gray-300 hover:bg-blue-800 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}