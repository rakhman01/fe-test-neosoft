import api from "../../../config/api";

export async  function getTransactions() {
  let response  = await api.get("/invoices");
  return response 
}
export async function getDetailTransactions(id) {
  let response = await api.get(`/invoices/${id}`);
  return response
}
export async function createTransactions(params) {
  let response =  api.post("/invoices", params);
  return response
}
export async  function updateTransactions({ id, params }) {
  let response = await api.put(`/invoices/${id}`, params);
   return response
}
export async  function deleteTransactions(id) {
  let response = await api.delete(`/invoices/${id}`);
   return response
}
