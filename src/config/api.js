import axios from "axios";

const base_Url = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: base_Url,
    headers: {
        "Content-Type": "application/json"
    }
})

export default api