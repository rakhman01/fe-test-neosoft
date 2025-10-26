import React, { useEffect, useState } from "react";
import Modal from "../../../components/reusable-modal";
import Button from "../../../components/reusable-button";

export default function ProductModal({isOpen, onClose, onSubmit, detailData }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      name: formData.name,
      price: parseInt(formData.price, 10),
    };
    onSubmit(submitData);
  };

  useEffect(() => {
    if (detailData) {
      setFormData({
        name: detailData?.name || "",
        price: detailData?.price?.toString() || "",
      });
    } else {
      setFormData({ name: "", price: "" });
    }
  }, [detailData, isOpen]);


  return (
    <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={detailData ? "Edit Produk" : "Tambah Produk"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="w-full flex flex-col justify-start items-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama produk"
            required
          />
        </div>

        <div className="w-full flex flex-col justify-start items-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Harga
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan harga"
            required
            min="0"
          />
        </div>
        
        <Button title={detailData ? "Update" : "Simpan"} className="mt-2" fullWidth />
      </form>
    </Modal>
  );
}
