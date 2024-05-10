import axios from "axios";
import { API } from "../api";
import RegisterRequest from "../../models/dto/LoginRequestDTO";

export async function signUp(credentials: RegisterRequest) {
  const response = await axios.post(`${API}auth/register`, credentials);
  const { data } = response;
  return data;
}
