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
        salaryAmount: string;
        localCurrencyCode: string;
    };
    handleChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}>) {


    return (
        <div className=" bg-white w-full md:max-w-md mx-auto">
            {/* Header with icon and title */}
            <div className="mb-4 bg-blue-900 text-white space-x-2 px-8 py-12">
                <div className="flex font-bold items-center space-x-2">
                    <GiTakeMyMoney className="text-7xl" />
                    <h2 className="text-2xl">Welcome to Salary Management</h2>
                </div>
                <p className="text-gray-200 italic">Manage your salary records efficiently.</p>
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
                    <label className="block text-gray-700 mb-1 text-sm font-semibold" htmlFor="salaryAmount">
                        Salary Amount:
                    </label>
                    <input
                        type="number"
                        id="salaryAmount"
                        name="salaryAmount"
                        value={formData.salaryAmount}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-600"
                        min="0"
                        step="0.01"
                        required
                    />
                </div>
                <div className="mb-8">
                    <label className="block text-gray-700 mb-1 text-sm font-semibold" htmlFor="localCurrencyCode">
                        Currency Code:
                    </label>
                    <select
                        id="localCurrencyCode"
                        name="localCurrencyCode"
                        value={formData.localCurrencyCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 outline-none focus:border-blue-600"
                        required
                    >
                        <option value="EUR">EUR (Euro)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="GBP">GBP (British Pound)</option>
                        <option value="GHC">GHC (Ghana Cedi)</option>
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