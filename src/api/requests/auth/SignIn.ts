import axios from "axios";
import LoginRequest from "../../../models/dto/LoginRequestDTO";
import { API } from "../..";

export async function signIn(credentials: LoginRequest) {
    const response = await axios.post(`${API}/auth/login`, credentials);
    const { data } = response;
    return data;
}
