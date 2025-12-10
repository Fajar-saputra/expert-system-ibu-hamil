import React from 'react';

/**
 * Komponen tombol utama untuk memulai proses Diagnosa.
 * Menggunakan styling Tailwind CSS.
 */
export default function ButtonDiagnosa({ onClick }) {
    return (
        <button
            onClick={onClick}
            // Warna latar belakang mendekati #9cbbfc (Indigo/Blue muda)
            // Hover mendekati #4840ac (Indigo tua)
            className="
                bg-indigo-400 
                hover:bg-indigo-600 
                text-white 
                font-semibold 
                py-3 
                px-6 
                rounded-full
                shadow-lg 
                transition 
                duration-300 
                ease-in-out
                transform hover:scale-105
                focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50
            "
        >
            Diagnosa Sekarang
        </button>
    );
}