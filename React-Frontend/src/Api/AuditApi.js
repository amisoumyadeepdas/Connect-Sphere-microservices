import axios from "axios";

const API_URL = "http://localhost:8085/api/audit/auditLog";

export const getAllAudits = () => axios.get(API_URL);
