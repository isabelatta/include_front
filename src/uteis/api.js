import { create } from "apisauce";

const api = create({
  baseURL: "http://192.168.0.13:3000/api",
  headers: { "Content-Type": "application/json" },
});

export default api;