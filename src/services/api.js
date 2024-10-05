import axios from "axios";
const token = sessionStorage.getItem("@Auth:token");
export const Api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `${token}`
  }
});
