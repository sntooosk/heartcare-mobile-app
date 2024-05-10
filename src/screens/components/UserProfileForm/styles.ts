import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerForm: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  title: {
    fontSize: 13,
    marginTop: 15,
    paddingBottom: 8,
  },
  checkbox: {
    margin: 5,
  },
  label: {
    fontSize: 12,
    paddingLeft: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  checkboxContainerDoc: {
    flexDirection: "column",
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
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
    fontSize: 15,
    fontWeight: "bold",
  },
});
