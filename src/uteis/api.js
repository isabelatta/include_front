import { create } from "apisauce";

const api = create({
  // baseURL: "https://servidor-tees-tcc.herokuapp.com/api/"
  baseURL: "http://localhost:3000/api/",
});

export default api;