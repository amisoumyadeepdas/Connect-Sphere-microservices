import axios from "axios";

const API_URL = "http://localhost:8085/api/users";

export const getAllUsers = () => axios.get(API_URL);
export const addUser = (user) => axios.post(API_URL, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
