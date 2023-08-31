import axios from "axios";

const api = axios.create({
  baseURL: "https://fugk2m8ox2.execute-api.ap-south-1.amazonaws.com/dev/api",
  // You can set other configuration options here if needed
});

export default api;
