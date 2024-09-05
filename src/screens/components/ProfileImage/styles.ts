import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    margin: Platform.OS === "web" ? 30 : 25,
  },
  profileImage: {
    width: Platform.OS === "web" ? 120 : 100,
    height: Platform.OS === "web" ? 120 : 100,
    borderRadius: Platform.OS === "web" ? 60 : 50,
  },
});
