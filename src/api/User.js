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
    }
}


export default userService;