import axios from "axios";


const API_URL = "https://localhost:7142/api/users";


const userService = {
    loginById: async (user) => {
        const response = await axios.post(`${API_URL}/login`,user);
        return response;
    },
    logout: async () => {
        const response = await axios.post(`${API_URL}/logout`)
        return response;
    },
    registerUser: async (userBody) => {
        const response = await axios.post(`${API_URL}/createUser`,userBody)
        return response;
    },
    updateUser:async (id, data)  => {
        const response = await axios.put(`${API_URL}/updateUser/${id}`,data);
        return response;
    },
    deleteUser:async (id) => {
        const response = await axios.delete(`${API_URL}/deleteUser/${id}`);
        return response;
    } 
}


export default userService;