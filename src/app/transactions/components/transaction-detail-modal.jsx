import Modal from "../../../components/reusable-modal";

export default function TransactionDetailModal({ isOpen, onClose, data }) {
  if (!data) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Transaksi"
      size="lg"
    >
      <div className="flex flex-col gap-6">
        {/* Header Info */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Nomor Invoice
              </label>
              <div className="text-base font-semibold text-gray-900">
                {data.invoice_no}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Tanggal
              </label>
              <div className="text-base text-gray-900">
                {new Date(data.date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                ID Pasien
              </label>
              <div className="text-base font-semibold text-gray-900">
                {data.patient?.code || '-'}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">
                Nama Pasien
              </label>
              <div className="text-base text-gray-900">
                {data.patient?.name || '-'}
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Daftar Produk
          </label>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Item
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Harga
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                    Jumlah
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.items?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">
                      {item.product?.name || '-'}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-700">
                      Rp {item.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-4 py-3 text-center text-gray-700">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      Rp {item.subtotal.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Total</div>
              <div className="text-2xl font-bold text-gray-900">
                Rp {data.total.toLocaleString('id-ID')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
