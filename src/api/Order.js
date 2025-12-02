import { ApiProvider } from "@reduxjs/toolkit/query/react";
import axios from "axios";

const API_URL = "https://localhost:7142/api/orders";

const orderService = {
    sendOrders: async (orderArray) => {
        const response = await axios.post(API_URL, orderArray);
        return response;
    },
    getAllShoppingHistory: async (data) => {
        const response = await axios.post(`${API_URL}/myOrders`,data);
        return response;
    }
};

export default orderService;