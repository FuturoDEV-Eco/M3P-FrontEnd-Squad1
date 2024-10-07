import axios from "axios";
const token = sessionStorage.getItem("@Auth:token");
const apiUrl = import.meta.env.VITE_API_URL;
export const Api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`
  }
});
