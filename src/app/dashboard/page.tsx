
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '@/components/Dashboard';

// Define the RecordType interface
interface RecordType {
    id: string | number;
    name: string;
    email: string;
    salaryAmount: number;
    localCurrencyCode: string;
    salaryInEuros: number;
    commission: number;
}

export default function DashboardPage() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editForm, setEditForm] = useState({
        salaryAmount: 0,
        localCurrencyCode: '',
        salaryInEuros: 0,
        commission: 500
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/salaries');
            setRecords(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching records:', error);
            setLoading(false);
        }
    };

    const handleEditClick = (record: RecordType) => {
        setEditingId(record.id);
        setEditForm({
            salaryAmount: record.salaryAmount,
            localCurrencyCode: record.localCurrencyCode,
            salaryInEuros: record.salaryInEuros,
            commission: record.commission
        });
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setEditForm({
            ...editForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async (id: string | number) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/salaries/${id}`, editForm);
            setEditingId(null);
            fetchRecords(); // Refresh data
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    const handleDelete = async (id: string | number) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/salaries/${id}`);
            fetchRecords(); // Refresh data
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const handleExport = () => {
        import('xlsx').then((XLSX) => {
            const worksheet = XLSX.utils.json_to_sheet(records.map(record => ({
                Name: record.name,
                Email: record.email,
                'Local Salary': record.salaryAmount,
                'Local Currency': record.localCurrencyCode,
                'Salary (€)': record.salaryInEuros,
                'Commission (€)': record.commission,
                'Displayed Salary (€)': Number(record.salaryInEuros ?? 0) + Number(record.commission)
            })));
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Records");
            XLSX.writeFile(workbook, "SalaryRecords.xlsx");
        });
    };

    return (
        <>
            <Dashboard
                records={records}
                loading={loading}
                handleEditClick={handleEditClick}
                editingId={editingId}
                editForm={editForm}
                handleEditChange={handleEditChange}
                handleCancel={handleCancel}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleExport={handleExport}
            />
        </>
    );
}