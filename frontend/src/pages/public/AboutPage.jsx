import React from "react";
import { FaGraduationCap, FaShieldAlt, FaLightbulb } from "react-icons/fa";
import aboutImage  from "../../assets/images/aboutImage.png";

const AboutPage = () => {
    return (
        <div className="container mx-auto max-w-4xl px-4 py-12">
            {/* Judul Utama */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-4 border-indigo-500 pb-2">About Us</h1>

            {/* Bagian Perkenalan */}
            <section className="bg-white shadow-xl rounded-lg p-8 mb-10 grid grid-cols-5 gap-7 items-center justify-center">
                <div className="border-3 col-span-3">
                    <p className=" text-gray-700 text-md leading-relaxed">
                        Sistem Pakar ini dikembangkan untuk membantu dalam proses identifikasi dan diagnosis awal penyakit, berdasarkan gejala yang dimasukkan oleh pengguna. Kami menggunakan
                        metodologi Forward Chaining (Rantai Maju) yang didukung oleh basis pengetahuan yang disusun oleh pakar di bidangnya.
                    </p>
                    <p className="mt-4 text-md text-gray-600">
                        Tujuan utama kami adalah menyediakan alat bantu yang cepat dan akurat untuk skrining awal, sehingga pengguna dapat segera mengambil langkah penanganan yang tepat.
                    </p>
                </div>
                <div className="col-span-2">
                    <img src={`${aboutImage}`} alt="about image" />
                </div>
            </section>

            {/* Bagian Keunggulan */}
            <section className="mb-10">
                <h2 className="text-3xl font-bold text-indigo-700 mb-6">Mengapa Menggunakan Sistem Kami?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Keunggulan 1 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-red-500">
                        <FaGraduationCap className="text-4xl text-red-500 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Didukung Basis Pengetahuan</h3>
                        <p className="text-gray-600">Basis pengetahuan kami disusun dan diverifikasi oleh pakar, menjamin relevansi dan validitas setiap aturan diagnosis.</p>
                    </div>

                    {/* Keunggulan 2 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                        <FaShieldAlt className="text-4xl text-yellow-500 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Diagnosis Cepat & Akurat</h3>
                        <p className="text-gray-600">Dengan algoritma *Forward Chaining*, sistem dapat mencapai kesimpulan diagnosis dalam waktu singkat berdasarkan urutan gejala yang diberikan.</p>
                    </div>

                    {/* Keunggulan 3 */}
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md border-t-4 border-green-500">
                        <FaLightbulb className="text-4xl text-green-500 mb-3" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Penjelasan yang Jelas</h3>
                        <p className="text-gray-600">Setiap hasil diagnosis dilengkapi dengan penjelasan tentang gejala yang cocok dan solusi penanganan yang direkomendasikan.</p>
                    </div>
                </div>
            </section>

            {/* Disclaimer Penting */}
            <section className="border-l-4 border-yellow-600 bg-yellow-100 p-4 rounded-md">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Peringatan (Disclaimer)</h3>
                <p className="text-yellow-700">
                    Sistem ini hanyalah alat bantu. Hasil diagnosis tidak dapat menggantikan nasihat, diagnosis, atau perawatan yang diberikan oleh dokter profesional. Selalu konsultasikan kondisi
                    kesehatan Anda dengan tenaga medis yang berwenang.
                </p>
            </section>
        </div>
    );
};

export default AboutPage;
