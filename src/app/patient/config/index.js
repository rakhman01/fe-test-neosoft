import api from "../../../config/api";

export async  function getpatient() {
  let response  = await api.get("/patients");
  return response 
}
export async function getDetailPatient(id) {
  let response = await api.get(`/patients/${id}`);
  return response
}
export async function createPatient(params) {
  let response =  api.post("/patients", params);
  return response
}
export async  function updatePatient({ id, params }) {
  let response = await api.put(`/patients/${id}`, params);
   return response
}
export async  function deletePatient(id) {
  let response = await api.delete(`/patients/${id}`);
   return response
}
