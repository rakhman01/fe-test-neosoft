import api from "../../../config/api";

export async  function getProducts() {
  let response  = await api.get("/products");
  return response 
}
export async function getDetailProducts(id) {
  let response = await api.get(`/products/${id}`);
  return response
}
export async function createProducts(params) {
  let response =  api.post("/products", params);
  return response
}
export async  function updateProducts({ id, params }) {
  let response = await api.put(`/products/${id}`, params);
   return response
}
export async  function deleteProducts(id) {
  let response = await api.delete(`/products/${id}`);
   return response
}
