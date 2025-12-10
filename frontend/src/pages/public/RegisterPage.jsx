// frontend/src/pages/RegisterPage.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { register, reset } from "../../features/auth/authSlice.js";
import { toast, ToastContainer } from "react-toastify";
// Import gambar latar belakang jika ada, atau gunakan bg-cover Tailwind
import bgImage from '../../assets/images/bg.png';

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const { name, email, password, password2 } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    // --- Efek Samping (Side Effects) ---
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Kata sandi tidak cocok!");
        } else {
            const userData = {
                name,
                email,
                password,
                role: "user", // Default role
            };
            dispatch(register(userData));
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center bg-[bgImage]"
            // Atur background sesuai gambar Anda (misal: dengan style)
            style={{ backgroundImage: `url('../src/assets/images/bg.png')` }}
        >
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold mb-2">
                        <FaUserPlus className="inline-block mr-2 text-blue-500" /> Daftar
                    </h1>
                    <p className="text-gray-600">Buat akun untuk memulai diagnosa</p>
                </header>

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Nama */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            placeholder="Nama Lengkap"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            placeholder="Kata Sandi"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Konfirmasi Password */}
                    <div>
                        <input
                            type="password"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            placeholder="Konfirmasi Kata Sandi"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    {/* Tombol Submit */}
                    <button
                        type="submit"
                        className="w-full py-3 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
                        style={{
                            backgroundColor: "#9cbbfc",
                            "--tw-bg-opacity": 1,
                        }}
                        // Custom hover style menggunakan class di tailwind.config.js atau inline
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4840a3")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#9cbbfc")}
                    >
                        Daftar
                    </button>
                </form>

                <footer className="mt-4 text-center text-sm text-gray-600">
                    Sudah punya akun?
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium ml-1">
                        Masuk
                    </Link>
                </footer>
            </div>
            {/* Wajib tambahkan ToastContainer di root App.jsx atau di sini */}
            <ToastContainer position="top-center" />
        </div>
    );
}

export default RegisterPage;
