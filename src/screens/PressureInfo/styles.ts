import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textoVazio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  containerHeader: {
    marginTop: "15%",
    marginBottom: "10%",
    paddingStart: "5%",
  },
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    paddingTop: 0,
  },
  label: {
    fontSize: 15,
    marginTop: 12,
  },
  themeToggleButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 0 : 40,
    right: 20,
    padding: 5,
    borderRadius: 20,
  },
});
