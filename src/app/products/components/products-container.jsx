import { getProducts, createProducts, updateProducts, deleteProducts } from "../config";
import ReusableTable from "../../../components/reusable-table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductModal from "./products-modal";
import { useState } from "react";
import Button from "../../../components/reusable-button";
import { useAlert } from "../../../components/alert";
import LoaderTab from "../../../components/loader";

export default function ProductsContainer() {
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const createMutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenModal(false);
      setDetailData(null);
      showAlert("Product created successfully!", "success");
    },
    onError: (error) => {
      showAlert(`Error creating product: ${error.message}`, "error");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpenModal(false);
      setDetailData(null);
      showAlert("Product updated successfully!", "success");
    },
    onError: (error) => {
      showAlert(`Error updating product: ${error.message}`, "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      showAlert("Product deleted successfully!", "success");
    },
    onError: (error) => {
      showAlert(`Error deleting product: ${error.message}`, "error");
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
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAddNew = () => {
    setDetailData(null);
    setOpenModal(true);
  };

  if (isPending) {
    return <LoaderTab />
  }

  if (isError) {
    return <div className="p-8 text-center text-red-600">Error: {error.message}</div>;
  }

  const productsData = data?.data || [];

  return (
    <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Products Management</h1>
    <ReusableTable
      data={productsData}
      columns={[
        {
          accessorKey: "code",
          header: "Product Code",
        },
        {
          accessorKey: "name",
          header: "Product Name",
        },
        {
          accessorKey: "price",
          header: "Price",
          cell: (info) => `Rp ${info.getValue().toLocaleString('id-ID')}`,
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
      toolbar={<Button size="sm" title="Tambah Produk" onClick={handleAddNew} />}
      pageSize={10}
      showPagination={true}
    />
    <ProductModal
    isOpen={openModal}
    onClose={() => setOpenModal(false)}
    detailData={detailData}
    onSubmit={handleSubmit}
    />
    </div>
  );
}
