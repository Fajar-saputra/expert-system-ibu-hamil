import React from "react";

import BgImage from "../../assets/images/about.png";
import ButtonDiagnose from "../../components/layout/ButtonDiagnose";

function AboutPage() {
    return (
        <div className="max-w-5xl mx-auto bg-white">
            {/* <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 flex flex-col lg:flex-row items-center justify-between gap-12"> */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
                {/* Bagian Teks (Kiri) */}
                <div className="w-full lg:w-1/2 space-y-6 animate-fade-in">
                    <h1 className="text-6xl font-extrabold leading-none text-[#7C74EE]">About Us</h1>

                    <p className="text-gray-600 text-base  lg:text-lg leading-relaxed max-w-xl text-justify">
                        Bunda Care adalah platform digital yang membantu ibu hamil mengenali gejala umum dan mendapatkan skrining awal secara cepat. Kami menyediakan informasi kesehatan yang akurat
                        agar ibu lebih siap sebelum konsultasi medis.
                    </p>
                    <ButtonDiagnose />
                </div>

                {/* Bagian Gambar (Kanan) */}
                <div className="w-full lg:w-1/2 relative flex justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-[#7C74EE] rounded-full opacity-90 -z-10"></div>

                    <img src={`${BgImage}`} alt="Ibu Hamil Bunda Care" className="w-80 md:w-90 object-contain" />
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
