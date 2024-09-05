import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 13,
    marginTop: 28,
    marginBottom: 10,
  },
  input: {
    height: 50,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 12,
    paddingStart: 10,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    padding: 5,
    fontWeight: "bold",
  },
  buttonRegister: {
    alignSelf: "center",
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  otpDigit: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center", // Centraliza o texto horizontalmente
    fontWeight: "bold", // Define o texto como negrito
    fontSize: 20, // Define o tamanho da fonte
  },
});
