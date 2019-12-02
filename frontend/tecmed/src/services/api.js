import axios from "axios"

const api = axios.create({
    baseURL: "http://ec2-54-165-32-50.compute-1.amazonaws.com/"
});

export default api