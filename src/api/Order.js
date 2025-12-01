import axios from "axios";

const API_URL = "https://localhost:7142/api/orders";

const orderService = {
    sendOrders: async (orderArray) => {
        const response = await axios.post(API_URL, orderArray);
        return response;
    }
};

export default orderService;