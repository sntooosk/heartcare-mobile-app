import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
  },
  themeToggleButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 0 : 40,
    right: 20,
    padding: 5,
    borderRadius: 20,
  },
  addButton: {
    position: "absolute",
    bottom: 120,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  addButtonText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },

  message: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
