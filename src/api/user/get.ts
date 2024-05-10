import axios from "axios";
import { API } from "../api";
import UserProfile from "../../models/UserProfile";

export async function getProfile(): Promise<UserProfile> {
  const response = await axios.get(`${API}profile/get`);
  const { data } = response;
  return data;
}
