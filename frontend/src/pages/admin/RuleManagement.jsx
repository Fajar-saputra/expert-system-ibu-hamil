import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRules, createRule, updateRule, deleteRule, reset } from "../../features/rules/ruleSlice";
import { getPenyakits } from "../../features/penyakit/penyakitSlice";
import { getGejalas } from "../../features/gejala/gejalaSlice";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";

function RuleManagement() {
    const dispatch = useDispatch();

    // Mengambil data dari 3 slice berbeda
    const { rules, isLoading, isError, message } = useSelector((state) => state.rule);
    const { Penyakit } = useSelector((state) => state.penyakit);
    const { gejalas } = useSelector((state) => state.gejala);

    const [formData, setFormData] = useState({
        penyakit: "",
        gejala: [],
        bobot: 0,
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        dispatch(getRules());
        dispatch(getPenyakits());
        dispatch(getGejalas());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ penyakit: "", gejala: "", bobot: 0 });
        setIsEditing(false);
        setEditId(null);
        setShowForm(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            dispatch(updateRule({ id: editId, ...formData }))
                .unwrap()
                .then(() => {
                    toast.success("Rule diperbarui!");
                    resetForm();
                })
                .catch((err) => toast.error(err));
        } else {
            dispatch(createRule(formData))
                .unwrap()
                .then(() => {
                    toast.success("Rule baru ditambahkan!");
                    resetForm();
                })
                .catch((err) => toast.error(err));
        }
    };

    const handleEdit = (item) => {
        setFormData({
            penyakit: item.penyakit._id,
            gejala: item.gejala.map((g) => g._id),
            bobot: item.bobot,
        });
        setIsEditing(true);
        setEditId(item._id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Hapus rule ini?")) {
            dispatch(deleteRule(id))
                .unwrap()
                .then(() => toast.success("Rule dihapus!"))
                .catch((err) => toast.error(err));
        }
    };

    if (isLoading) return <div className="p-6 text-center">Memuat Basis Pengetahuan...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-indigo-700">Basis Aturan (Rules)</h1>
                <button onClick={() => (showForm ? resetForm() : setShowForm(true))} className={`px-4 py-2 rounded-lg text-white flex items-center ${showForm ? "bg-red-500" : "bg-indigo-600"}`}>
                    {showForm ? <FaTimes className="mr-2" /> : <FaPlus className="mr-2" />}
                    {showForm ? "Batal" : "Tambah Aturan"}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 p-6 border rounded-xl shadow-lg bg-white">
                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1">Pilih Penyakit</label>
                            <select name="penyakit" value={formData.penyakit} onChange={onChange} className="p-2 border rounded" required>
                                <option value="">-- Pilih Penyakit --</option>
                                {Penyakit?.map((p) => (
                                    <option key={p._id} value={p._id}>
                                        {p.kode} - {p.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1">Pilih Gejala</label>
                            <select
                                name="gejala"
                                multiple
                                value={formData.gejala}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        gejala: Array.from(e.target.selectedOptions, (o) => o.value),
                                    })
                                }
                                className="p-2 border rounded"
                                required
                            >
                                {gejalas.map((g) => (
                                    <option key={g._id} value={g._id}>
                                        {g.kode} - {g.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-bold mb-1">Bobot (0 - 1)</label>
                            <input type="number" step="0.1" min="0" max="1" name="bobot" value={formData.bobot} onChange={onChange} className="p-2 border rounded" required />
                        </div>
                        <div className="md:col-span-3 flex justify-end">
                            <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded hover:bg-green-700">
                                {isEditing ? "Perbarui" : "Simpan Aturan"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left">Penyakit</th>
                            <th className="py-3 px-6 text-left">Gejala</th>
                            <th className="py-3 px-6 text-center">Bobot</th>
                            <th className="py-3 px-6 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {rules?.map((r) => (
                            <tr key={r._id} className="hover:bg-gray-50">
                                <td className="py-4 px-6">
                                    <span className="font-bold text-indigo-600">{r.penyakit?.kode}</span> - {r.penyakit?.nama}
                                </td>
                                {/* <td className="py-4 px-6">
                                    <span className="font-bold text-green-600">{r.gejala?.kode}</span> - {r.gejala?.nama}
                                </td> */}
                                {/* <td className="py-4 px-6">
                                    {r.gejala?.map((g, index) => (
                                        <div key={g._id} className="mb-1">
                                            <span className="font-bold text-green-600">{g.kode}</span> - {g.nama}
                                            {index < r.gejala.length - 1 && ","}
                                        </div>
                                    ))}
                                </td> */}
                                <td className="py-4 px-6">
                                    {r.gejala && r.gejala.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {r.gejala.map((g) => (
                                                <span key={g._id} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded border border-green-200">
                                                    {g.kode} - {g.nama}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-red-500 text-xs italic">Gejala belum diatur</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center font-mono">{r.bobot}</td>
                                <td className="py-4 px-6 text-center flex justify-center gap-3">
                                    <button onClick={() => handleEdit(r)} className="text-yellow-600 hover:text-yellow-800">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(r._id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RuleManagement;
