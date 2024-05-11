import axios from "axios";
import { API } from "../api";
import LoginRequest from "../../models/dto/LoginRequestDTO";

export async function signIn(credentials: LoginRequest) {
    const response = await axios.post(`${API}/auth/login`, credentials);
    const { data } = response;
    return data;
}
