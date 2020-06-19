import axios from "axios";
import { useContext } from "react";
import AuthContext from "../contexts/auth";

export default axios.create({
  baseURL: "http://localhost:8000"
});