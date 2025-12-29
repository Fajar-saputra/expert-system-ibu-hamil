import React from "react";
import ButtonDiagnose from "../../components/layout/ButtonDiagnose";
import homeImage from "../../assets/images/home.png";

export default function HomePage() {
    return (
        <div className="max-w-5xl mx-auto bg-white pt-24 px-4 sm:px-6 min-h-screen">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* SISI KIRI - TEKS */}
                <div className="w-full lg:w-3/5 space-y-6 text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-[#6155F5]">
                        Diagnosa Penyakit <br /> Ibu Hamil
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify">
                        Kesehatan Ibu dan buah hati adalah prioritas utama. Bunda Care hadir sebagai asisten digital terpercaya untuk membantu Bunda melakukan deteksi dini terhadap berbagai gejala
                        selama masa kehamilan melalui sistem pakar berbasis medis yang akurat.
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <ButtonDiagnose />
                    </div>
                </div>

                {/* SISI KANAN - GAMBAR */}
                <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                    <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
                        <img src={homeImage} alt="Konsultasi Ibu Hamil" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
}
