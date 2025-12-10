// frontend/src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// import { FaSignInAlt } from 'react-icons/fa'; // Jika menggunakan React Icons
import { login, reset } from '../../features/auth/authSlice'; // Import thunk login
import { toast, ToastContainer } from 'react-toastify';

function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            navigate('/'); // Arahkan ke home setelah login sukses
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

        const userData = {
            email,
            password,
        };

        dispatch(login(userData)); // Panggil thunk login
    };

    if (isLoading) {
        return <div><p>Loading...</p></div>; 
    }

    return (
        <div /* Tambahkan style centering Anda di sini */>
            <div /* Tambahkan style card Anda di sini */>
                <header>
                    <h1>
                        {/* <FaSignInAlt /> */} Masuk
                    </h1>
                    <p>Silakan masuk ke akun Anda</p>
                </header>

                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type='email'
                            name='email'
                            value={email}
                            onChange={onChange}
                            placeholder='Email'
                            required
                            /* Tambahkan class Tailwind di sini */
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            name='password'
                            value={password}
                            onChange={onChange}
                            placeholder='Kata Sandi'
                            required
                            /* Tambahkan class Tailwind di sini */
                        />
                    </div>
                    <button type='submit' /* Tambahkan class Tailwind di sini */>
                        Masuk
                    </button>
                </form>

                <footer>
                    Belum punya akun? 
                    <Link to="/register" /* Tambahkan class Tailwind di sini */>
                        Daftar
                    </Link>
                </footer>
            </div>
            {/* ToastContainer wajib ada di root */}
        </div>
    );
}

export default LoginPage;