"use client";

import UserSalaryForm from "@/components/UserSalaryForm";
import axios from "axios";
import { useState } from "react";


export default function Home() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    local_currency_amount: '',
    local_currency_code: 'EUR'
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
      // await axios.post('/api/salaries', formData);
      console.log("Form submitted:", formData);
      setFormData({
        name: '',
        email: '',
        local_currency_amount: '',
        local_currency_code: 'EUR'
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <main className="min-h-screen md:flex md:items-center md:justify-center bg-gray-100">
      <UserSalaryForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
