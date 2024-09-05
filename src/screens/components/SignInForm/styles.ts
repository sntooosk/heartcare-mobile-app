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
  inputPassword: {
    height: 50,
    width: "85%",
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
  inputArea: {
    flexDirection: "row",
    borderRadius: 10,
    height: 50,
  },
  icon: {
    width: "15%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
  togglePasswordButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  togglePasswordButtonText: {
    fontSize: 14,
  },
});
