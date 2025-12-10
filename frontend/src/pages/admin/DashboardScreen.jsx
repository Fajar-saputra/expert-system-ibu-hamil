// frontend/src/pages/admin/DashboardScreen.jsx

import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
// NavLink dari react-router-dom digunakan untuk styling link aktif

const DashboardScreen = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar (Menu Admin) */}
            <aside className="w-64 bg-indigo-800 text-white p-6 shadow-xl">
                <h2 className="text-2xl font-bold mb-8 border-b border-indigo-700 pb-2">Admin Panel</h2>
                <nav className="space-y-2">
                    {/* Link Dashboard Utama */}
                    <NavLink
                        to="/admin/dashboard"
                        end // 'end' memastikan ini hanya aktif saat di rute persis
                        className={({ isActive }) => 
                            isActive ? "block p-3 rounded-lg bg-indigo-700 font-semibold" : "block p-3 rounded-lg hover:bg-indigo-700"
                        }
                    >
                        Dashboard
                    </NavLink>
                    
                    {/* Link CRUD Gejala */}
                    <NavLink
                        to="/admin/gejala"
                        className={({ isActive }) => 
                            isActive ? "block p-3 rounded-lg bg-indigo-700 font-semibold" : "block p-3 rounded-lg hover:bg-indigo-700"
                        }
                    >
                        Kelola Gejala
                    </NavLink>
                    
                    {/* Link CRUD Penyakit */}
                    <NavLink
                        to="/admin/penyakit"
                        className={({ isActive }) => 
                            isActive ? "block p-3 rounded-lg bg-indigo-700 font-semibold" : "block p-3 rounded-lg hover:bg-indigo-700"
                        }
                    >
                        Kelola Penyakit
                    </NavLink>
                    
                    {/* Link CRUD Rule/Aturan */}
                    <NavLink
                        to="/admin/rules"
                        className={({ isActive }) => 
                            isActive ? "block p-3 rounded-lg bg-indigo-700 font-semibold" : "block p-3 rounded-lg hover:bg-indigo-700"
                        }
                    >
                        Kelola Rule
                    </NavLink>
                </nav>
            </aside>

            {/* Konten Utama Admin */}
            <main className="flex-1 p-8">
                {/* Outlet akan merender halaman CRUD yang spesifik (misal: GejalaListScreen) */}
                <Outlet /> 
            </main>
        </div>
    );
};

export default DashboardScreen;