import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/articles");
      setArticles(data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil data artikel");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus artikel ini?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus artikel");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white p-6 shadow rounded max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manajemen Artikel</h2>
        <Link
          to="/admin/articles/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Artikel
        </Link>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2 text-left">Judul</th>
            <th className="border px-3 py-2 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center py-4 text-gray-500">
                Belum ada artikel
              </td>
            </tr>
          ) : (
            articles.map((article) => (
              <tr key={article._id}>
                <td className="border px-3 py-2">{article.title}</td>
                <td className="border px-3 py-2 text-center space-x-2">
                  <Link
                    to={`/admin/articles/edit/${article._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminArticleList;
