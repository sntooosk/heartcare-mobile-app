import axios from "axios";
import { API } from "../..";
import LoginRequest from "../../../models/dto/LoginRequestDTO";

export async function signIn(credentials: LoginRequest) {
  const { data } = await axios.post(`${API}/auth/login`, credentials);
  return data;
}
