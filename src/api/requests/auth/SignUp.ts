import axios from "axios";
import { API } from "../..";
import RegisterRequest from "../../../models/dto/LoginRequestDTO";

export async function signUp(credentials: RegisterRequest) {
  const { data } = await axios.post(`${API}/auth/register`, credentials);
  return data;
}
