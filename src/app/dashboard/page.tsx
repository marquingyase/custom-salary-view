
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from '@/components/Dashboard';

// Define the RecordType interface
interface RecordType {
    id: string | number;
    name: string;
    email: string;
    local_currency_amount: number;
    local_currency_code: string;
    salary_in_euros: number;
    commission: number;
}

export default function DashboardPage() {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | number | null>(null);
    const [editForm, setEditForm] = useState({
        local_currency_amount: '',
        local_currency_code: '',
        salary_in_euros: '',
        commission: 500
    });

    useEffect(() => {
        fetchRecords();
    }, []);

    const fetchRecords = async () => {
        try {
            const response = await axios.get('/api/salaries');
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
            local_currency_amount: record.local_currency_amount.toString(),
            local_currency_code: record.local_currency_code,
            salary_in_euros: record.salary_in_euros.toString(),
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
            await axios.put(`/api/salaries/${id}`, editForm);
            setEditingId(null);
            fetchRecords(); // Refresh data
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
    };



    return (
        <>
            <Dashboard
                records={records}
                loading={loading}
                handleEditClick={handleEditClick}
                fetchRecords={fetchRecords}
                editingId={editingId}
                editForm={editForm}
                handleEditChange={handleEditChange}
                handleCancel={handleCancel}
                handleSave={handleSave}
            />
        </>
    );
}