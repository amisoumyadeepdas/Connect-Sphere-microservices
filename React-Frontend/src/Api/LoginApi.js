import axios from "axios";

const API_URL = "http://localhost:8085/api";

export const loginUser = (loginCredential) => axios.post(`${API_URL}/login`,loginCredential);
export const registerUser = (user) => axios.post(`${API_URL}/register`, user);
