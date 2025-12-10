// frontend/src/pages/public/DiagnosePage.jsx

import React from 'react';

const DiagnosePage = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
                Mulai Diagnosis
            </h1>
            <p className="text-center text-gray-600">
                Di sini akan ada daftar pertanyaan atau gejala yang bisa dipilih oleh pengguna.
            </p>
            {/* Konten formulir diagnosis akan diletakkan di sini */}
        </div>
    );
};

export default DiagnosePage;