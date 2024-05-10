import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: "5%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
  },
  buttonAcessar: {
    borderRadius: 20,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    position: "absolute",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
