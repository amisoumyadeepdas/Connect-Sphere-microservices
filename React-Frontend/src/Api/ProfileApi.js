// Api/ProfileApi.js
import axios from "axios";

const API_URL = "http://localhost:8081/api/profile";

export const getUserProfile = (id) =>
  axios.get(`${API_URL}/${id}`);

export const updateUserProfile = (id, user) =>
  axios.put(`${API_URL}/${id}`, user);

// Add this function
export const getFriends = (userId) =>
  axios.get(`${API_URL}/${userId}/friends`);
