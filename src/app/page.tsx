"use client";

import UserSalaryForm from "@/components/UserSalaryForm";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export default function Home() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    salaryAmount: '',
    localCurrencyCode: 'EUR'
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/salaries', formData)
        .then(() => {
          toast.success("Salary submitted successfully!");
          setFormData({
            name: '',
            email: '',
            salaryAmount: '',
            localCurrencyCode: 'EUR'
          })
        }).catch((error) => {
          toast.error("Error submitting form:", error);
        })
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <main className="min-h-screen md:flex flex-col md:items-center md:justify-center bg-gray-100">
      <UserSalaryForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div className="mt-8">
        <p className="text-center text-gray-600">
          <Link href="/dashboard" className="text-blue-600 underline">Go to Dashboard</Link>
        </p>
      </div>
      <ToastContainer position="top-center" />
    </main>
  );
}
