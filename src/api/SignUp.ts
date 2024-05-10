import axios from "axios";
import { API } from "./api";
import RegisterRequest from "../models/dto/LoginRequestDTO";

export async function signUp(credentials: RegisterRequest) {
  try {
    const response = await axios.post(`${API}/register`, credentials);
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error("Erro ao efetuar cadastro");
  }
}
