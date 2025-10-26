import {  createTransactions, updateTransactions, deleteTransactions, getTransactions } from "../config";
import ReusableTable from "../../../components/reusable-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TransactionsModal from "./transactions-modal";
import TransactionDetailModal from "./transaction-detail-modal";
import { useState } from "react";
import Button from "../../../components/reusable-button";

export default function TransactionsContainer() {
  const [openModal, setOpenModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [viewDetailData, setViewDetailData] = useState(null);
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["invoices"],
    queryFn: getTransactions,
  });

  const createMutation = useMutation({
    mutationFn: createTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      setOpenModal(false);
      setDetailData(null);
      alert("Transaction created successfully!");
    },
    onError: (error) => {
      alert(`Error creating transaction: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      setOpenModal(false);
      setDetailData(null);
      alert("Transaction updated successfully!");
    },
    onError: (error) => {
      alert(`Error updating transaction: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransactions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["invoices"] });
      alert("Transaction deleted successfully!");
    },
    onError: (error) => {
      alert(`Error deleting transaction: ${error.message}`);
    },
  });

  const handleSubmit = (formData) => {
    if (detailData) {
      updateMutation.mutate({ id: detailData.id, params: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (product) => {
    setDetailData(product);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddNew = () => {
    setDetailData(null);
    setOpenModal(true);
  };

  const handleViewDetail = (transaction) => {
    setViewDetailData(transaction);
    setOpenDetailModal(true);
  };

  if (isPending) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  }

  const transactionsData = data?.data?.data || [];

  return (
    <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Transactions Management</h1>
    <ReusableTable
      data={transactionsData}
      columns={[
        {
          accessorKey: "invoice_no",
          header: "Invoice No",
        },
        {
          accessorKey: "date",
          header: "Date",
          cell: (info) => new Date(info.getValue()).toLocaleDateString('id-ID'),
        },
        {
          id: "patient",
          header: "Patient",
          accessorFn: (row) => row.patient?.name || "-",
        },
        {
          accessorKey: "total",
          header: "Total",
          cell: (info) => `Rp ${info.getValue().toLocaleString('id-ID')}`,
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <div className="flex gap-2">
              <Button
                size="xs"
                color="primary"
                title="Detail"
                onClick={() => handleViewDetail(row.original)}
              />
              <Button
                size="xs"
                color="warning"
                title="Edit"
                onClick={() => handleEdit(row.original)}
              />
              <Button
                size="xs"
                color="danger"
                title="Delete"
                onClick={() => handleDelete(row.original.id)}
                disabled={deleteMutation.isPending}
              />
            </div>
          ),
        }
      ]}
      toolbar={<Button size="sm" title="Tambah Transaksi" onClick={handleAddNew} />}
      pageSize={10}
      showPagination={true}
    />
    <TransactionsModal
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
    detailData={detailData}
    onSubmit={handleSubmit}
    />
    <TransactionDetailModal
    isOpen={openDetailModal}
    onClose={() => setOpenDetailModal(false)}
    data={viewDetailData}
    />
    </div>
  );
}
