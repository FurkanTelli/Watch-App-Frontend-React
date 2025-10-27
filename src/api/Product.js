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
    deleteWatch:async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    }
}


export default  productService;