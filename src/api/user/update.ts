import axios from "axios";
import UserProfile from "../../models/UserProfile";
import { API } from "../api";

export async function updateProfile(credentials: UserProfile, id: string): Promise<void> {
    await axios.put(`${API}profile/update/${id}`, credentials);
}
