import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Modal from "../../../components/reusable-modal";
import Button from "../../../components/reusable-button";
import Dropdown from "../../../components/reusable-dropdown";
import { getProducts } from "../../products/config";
import api from "../../../config/api";

export default function TransactionsModal({isOpen, onClose, onSubmit, detailData }) {
  const [formData, setFormData] = useState({
    patient_id: "",
    items: [
      {
        product_id: "",
        quantity: 1,
        price: 0,
        subtotal: 0
      }
    ],
  });

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    enabled: isOpen,
  });

  const { data: patientsData } = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await api.get("/patients");
      return response;
    },
    enabled: isOpen,
  });

  const products = productsData?.data || [];
  const patients = patientsData?.data || [];

  const handlePatientChange = (e) => {
    setFormData((prev) => ({ ...prev, patient_id: parseInt(e.target.value, 10) }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;

    if (field === "product_id") {
      const selectedProduct = products.find(p => p.id === parseInt(value, 10));
      if (selectedProduct) {
        newItems[index].price = selectedProduct.price;
        newItems[index].subtotal = selectedProduct.price * newItems[index].quantity;
      }
    }

    if (field === "quantity") {
      const qty = parseInt(value, 10) || 0;
      newItems[index].quantity = qty;
      newItems[index].subtotal = newItems[index].price * qty;
    }

    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { product_id: "", quantity: 1, price: 0, subtotal: 0 }
      ]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      patient_id: formData.patient_id,
      items: formData.items.map(item => ({
        product_id: parseInt(item.product_id, 10),
        quantity: parseInt(item.quantity, 10),
      }))
    };
    onSubmit(submitData);
  };

  useEffect(() => {
    if (detailData) {
      setFormData({
        patient_id: detailData.patient_id || "",
        items: detailData.items?.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
          subtotal: item.subtotal
        })) || [{ product_id: "", quantity: 1, price: 0, subtotal: 0 }]
      });
    } else {
      setFormData({
        patient_id: "",
        items: [{ product_id: "", quantity: 1, price: 0, subtotal: 0 }]
      });
    }
  }, [detailData, isOpen]);


  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={detailData ? "Edit Transaksi" : "Tambah Transaksi"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Dropdown
          label="Pilih Pasien"
          name="patient_id"
          value={formData.patient_id}
          onChange={handlePatientChange}
          options={patients}
          placeholder="Pilih pasien..."
          required
          valueKey="id"
          labelKey="name"
        />

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Produk
            </label>
            <Button
              type="button"
              size="xs"
              color="success"
              title="+ Tambah Produk"
              onClick={addItem}
            />
          </div>

          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Produk
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase w-20">
                    Qty
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Harga
                  </th>
                  <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Subtotal
                  </th>
                  <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase w-16">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {formData.items.map((item, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-2 py-2">
                      <select
                        value={item.product_id}
                        onChange={(e) => handleItemChange(index, "product_id", e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                      >
                        <option value="">Pilih produk...</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-2 py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </td>
                    <td className="px-2 py-2 text-gray-700">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-2 py-2 font-medium text-gray-900">
                      Rp {item.subtotal.toLocaleString('id-ID')}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-600 hover:text-red-800 font-bold"
                        >
                          ×
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-3 px-2">
            <div className="text-right">
              <div className="text-sm text-gray-600">Total</div>
              <div className="text-lg font-bold text-gray-900">
                Rp {calculateTotal().toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>

        <Button 
          title={detailData ? "Update" : "Simpan"} 
          className="mt-2" 
          fullWidth 
        />
      </form>
    </Modal>
  );
}
