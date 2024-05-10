import axios from "axios";
import { API } from "./api";
import LoginRequest from "../models/dto/LoginRequestDTO";

export async function signIn(credentials: LoginRequest) {
  try {
    const response = await axios.post(`${API}/login`, credentials);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error("Erro ao efetuar login");
  }
}
