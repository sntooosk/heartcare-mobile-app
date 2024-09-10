import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  textBotao: {
    fontWeight: "bold",
  },

  textMedication: {
    fontSize: 16,
    marginVertical: 4,
  },

  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  button: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingVertical: 12,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
