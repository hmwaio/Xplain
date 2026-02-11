import axios from "axios";
import { BACKEND_URL } from "../../config.js";

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default apiClient;