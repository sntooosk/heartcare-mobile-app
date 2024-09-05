import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  inputContainer: {
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderRadius: 10,
    fontSize: 14,
    paddingHorizontal: 15,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
