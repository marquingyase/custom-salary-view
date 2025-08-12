import Link from "next/link";
import { FaSave } from "react-icons/fa";
import { MdCancel, MdDelete, MdModeEdit } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";

interface RecordType {
    id: string | number;
    name: string;
    email: string;
    salaryAmount: number;
    localCurrencyCode: string;
    salaryInEuros: number;
    commission: number;
}

interface DashboardProps {
    records: RecordType[];
    loading: boolean;
    handleEditClick: (record: RecordType) => void;
    handleSave: (id: string | number) => void;
    handleDelete: (id: string | number) => void;
    handleCancel: () => void;
    handleExport: () => void;
    editingId: string | number | null;
    editForm: {
        salaryAmount: number;
        localCurrencyCode: string;
        salaryInEuros: number;
        commission: number;
    };
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Dashboard({
    records,
    loading,
    handleEditClick,
    handleSave,
    handleCancel,
    editingId,
    editForm,
    handleEditChange,
    handleDelete,
    handleExport
}: DashboardProps) {

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center gap-1">
            <div className="animate-spin h-4 w-4 border-4 border-blue-500 rounded-full border-t-transparent"></div>
            <p className="text-blue-500 animate-pulse">Loading records...</p>
        </div>;
    }

    return (
        <div className="relative min-h-screen">
            <div className="flex justify-center font-bold bg-blue-900 text-white space-x-2 px-8 py-6">
                <TbReportAnalytics className="text-3xl" />
                <h2 className="text-2xl">Salary Records</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full overflow-hidden">
                    <thead className="bg-gray-300 text-neutral-600">
                        <tr>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Local Salary</th>
                            <th className="py-3 px-4 text-left">Local Currency</th>
                            <th className="py-3 px-4 text-left">Salary (€)</th>
                            <th className="py-3 px-4 text-left">Commission (€)</th>
                            <th className="py-3 px-4 text-left">Displayed Salary (€)</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {records.map((record) => (
                            <tr key={record.id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="py-3 px-4">{record.name}</td>
                                <td className="py-3 px-4">{record.email}</td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <input
                                            type="number"
                                            name="salaryAmount"
                                            value={editForm.salaryAmount}
                                            onChange={handleEditChange}
                                            className="w-24 px-2 py-1 border border-gray-300 outline-none focus:border-blue-600"
                                        />
                                    ) : (
                                        record.salaryAmount
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <select
                                            name="localCurrencyCode"
                                            value={editForm.localCurrencyCode}
                                            onChange={handleEditChange}
                                            className="px-2 py-1 border border-gray-300 outline-none focus:border-blue-600"
                                        >
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                            <option value="GHC">GHC</option>
                                        </select>
                                    ) : (
                                        record.localCurrencyCode
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <input
                                            type="number"
                                            name="salaryInEuros"
                                            value={editForm.salaryInEuros}
                                            onChange={handleEditChange}
                                            className="w-24 px-2 py-1 border border-gray-300 outline-none focus:border-blue-600"
                                        />
                                    ) : (
                                        record.salaryInEuros
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <input
                                            type="number"
                                            name="commission"
                                            value={editForm.commission}
                                            onChange={handleEditChange}
                                            className="w-24 px-2 py-1 border border-gray-300 outline-none focus:border-blue-600"
                                        />
                                    ) : (
                                        record.commission
                                    )}
                                </td>
                                <td className="py-3 px-4 font-medium">
                                    {Number(record.salaryInEuros ?? 0) + Number(record.commission)}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleSave(record.id)}
                                                className="cursor-pointer text-green-500 border border-green-300 p-1 rounded hover:text-green-600 hover:bg-gray-200"
                                            >
                                                <FaSave className="text-xl" />
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="cursor-pointer text-gray-500 border border-gray-300 p-1 rounded hover:text-gray-600 hover:bg-gray-200"
                                            >
                                                <MdCancel className="text-xl" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditClick(record)}
                                                className="cursor-pointer text-gray-500 border border-gray-300 p-1 rounded hover:text-gray-600 hover:bg-gray-200"
                                            >
                                                <MdModeEdit className="text-xl" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(record.id)}
                                                className="cursor-pointer text-red-500 border border-red-300 p-1 rounded hover:text-red-600 hover:bg-gray-200"
                                            >
                                                <MdDelete className="text-xl" />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {records.length === 0 && !loading && (
                            <tr>
                                <td colSpan={7} className="py-3 px-4 text-center">
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="absolute bottom-4 right-4 mt-4">
                <Link
                    href="/"
                    className="px-4 py-2 text-blue-600 hover:text-blue-700 underline"
                >
                    Go to Home
                </Link>
                <button
                    onClick={() => handleExport()}
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Export to CSV
                </button>
            </div>
        </div>
    );
}