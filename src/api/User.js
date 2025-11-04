import axios from "axios";


const API_URL = "https://localhost:7142/api/users";


const userService = {
    loginById: async (user) => {
        const response = await axios.post(API_URL,user);
        return response;
    }
}


export default userService;