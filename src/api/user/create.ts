import axios from "axios";
import UserProfile from "../../models/UserProfile";
import { API } from "../api";

export async function createProfile(credentials: UserProfile): Promise<void> {
  await axios.post(`${API}/profile/create`, credentials);
}
