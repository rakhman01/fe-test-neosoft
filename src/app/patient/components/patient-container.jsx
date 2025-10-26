import { getpatient, createPatient, updatePatient, deletePatient } from "../config";
import ReusableTable from "../../../components/reusable-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PatienttModal from "./patient-modal";
import { useState } from "react";
import Button from "../../../components/reusable-button";

export default function PatientContainer() {
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["patient"],
    queryFn: getpatient,
  });

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      setOpenModal(false);
      setDetailData(null);
      alert("Pasien created successfully!");
    },
    onError: (error) => {
      alert(`Error creating patient: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      setOpenModal(false);
      setDetailData(null);
      alert("Pasien updated successfully!");
    },
    onError: (error) => {
      alert(`Error updating patient: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patient"] });
      alert("Pasien deleted successfully!");
    },
    onError: (error) => {
      alert(`Error deleting patient: ${error.message}`);
    },
  });

  const handleSubmit = (formData) => {
    if (detailData) {
      updateMutation.mutate({ id: detailData.id, params: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (patient) => {
    setDetailData(patient);
    setOpenModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddNew = () => {
    setDetailData(null);
    setOpenModal(true);
  };

  if (isPending) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  }

  const PasiensData = data?.data || [];

  return (
    <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Pasiens Management</h1>
    <ReusableTable
      data={PasiensData}
      columns={[
        {
          accessorKey: "code",
          header: "Pasien Code",
        },
        {
          accessorKey: "name",
          header: "Pasien Name",
        },
        {
          accessorKey: "phone",
          header: "phone",
        },
        {
          id: "actions",
          header: "Actions",
          cell: ({ row }) => (
            <div className="flex gap-2">
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
      toolbar={<Button size="sm" title="Tambah Pasien" onClick={handleAddNew} />}
      pageSize={10}
      showPagination={true}
    />
    <PatienttModal
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
    detailData={detailData}
    onSubmit={handleSubmit}
    />
    </div>
  );
}
