import { TbReportAnalytics } from "react-icons/tb";

interface RecordType {
    id: string | number;
    name: string;
    email: string;
    local_currency_amount: number;
    local_currency_code: string;
    salary_in_euros: number;
    commission: number;
}

interface DashboardProps {
    records: RecordType[];
    loading: boolean;
    handleEditClick: (record: RecordType) => void;
    handleSave: (id: string | number) => void;
    handleDelete: (id: string | number) => void;
    handleCancel: () => void;
    editingId: string | number | null;
    editForm: {
        local_currency_amount: number;
        local_currency_code: string;
        salary_in_euros: number;
        commission: number;
    };
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function Dashboard({
    records,
    loading,
    handleEditClick,
    handleSave,
    handleDelete,
    handleCancel,
    editingId,
    editForm,
    handleEditChange,
}: DashboardProps) {

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <div className="">
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
                            <th className="py-3 px-4 text-left">Local Amount</th>
                            <th className="py-3 px-4 text-left">Currency</th>
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
                                            name="local_currency_amount"
                                            value={editForm.local_currency_amount}
                                            onChange={handleEditChange}
                                            className="w-24 px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        record.local_currency_amount
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <select
                                            name="local_currency_code"
                                            value={editForm.local_currency_code}
                                            onChange={handleEditChange}
                                            className="px-2 py-1 border rounded"
                                        >
                                            <option value="EUR">EUR</option>
                                            <option value="USD">USD</option>
                                            <option value="GBP">GBP</option>
                                        </select>
                                    ) : (
                                        record.local_currency_code
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <input
                                            type="number"
                                            name="salary_in_euros"
                                            value={editForm.salary_in_euros}
                                            onChange={handleEditChange}
                                            className="w-24 px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        record.salary_in_euros
                                    )}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <input
                                            type="number"
                                            name="commission"
                                            value={editForm.commission}
                                            onChange={handleEditChange}
                                            className="w-24 px-2 py-1 border rounded"
                                        />
                                    ) : (
                                        record.commission
                                    )}
                                </td>
                                <td className="py-3 px-4 font-medium">
                                    {(record.salary_in_euros + record.commission).toFixed(2)}
                                </td>
                                <td className="py-3 px-4">
                                    {editingId === record.id ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleSave(record.id)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleEditClick(record)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}