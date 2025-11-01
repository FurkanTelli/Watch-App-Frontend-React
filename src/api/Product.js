import axios from "axios";

const API_URL = "https://localhost:7142/api/watches";

const productService = {
    getAllWatches: async () => {
        const response = await axios.get(API_URL); 
        return response.data;
    }, 
    getWatchesById: async (id) => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    }, 
    updateWatchById: async (id, data) => {
        const response = await axios.put(`${API_URL}/${id}`,data);
        return response;
    },
    deleteWatch:async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    },
    addNewWatch: async (body) => {
        const response = axios.post(API_URL,body);
        return response;
    }
}


export default  productService;