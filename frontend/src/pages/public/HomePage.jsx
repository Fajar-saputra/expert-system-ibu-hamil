import React from "react";
import ButtonDiagnose from "../../components/layout/ButtonDiagnose";
import homeImage from "../../assets/images/home.png";

export default function HomePage() {
    return (
        <div className="max-w-5xl mx-auto bg-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
                {/* Sisi Kiri: Teks Konten */}
                <div className="w-full lg:w-3/5 space-y-6 animate-fade-in">
                    <h1 className="text-5xl font-extrabold leading-none text-[#7C74EE]">
                        Diagnosa Penyakit <br /> Ibu Hamil
                    </h1>

                    <p className="text-gray-600 text-base  lg:text-lg leading-relaxed max-w-xl text-justify">
                        Kesehatan Ibu dan buah hati adalah prioritas utama. Bunda Care hadir sebagai asisten digital terpercaya untuk membantu Bunda melakukan deteksi dini terhadap berbagai gejala
                        selama masa kehamilan melalui sistem pakar berbasis medis yang akurat
                    </p>

                        <ButtonDiagnose />
                </div>

                {/* Sisi Kanan: Gambar Bulat */}
                <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                    <div className="relative">
                        {/* Efek Lingkaran di belakang gambar jika ingin variasi, 
                  atau biarkan gambar yang sudah berbentuk lingkaran */}
                        <div className="w-80 h-80 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
                            <img src={`${homeImage}`} alt="Konsultasi Ibu Hamil" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
