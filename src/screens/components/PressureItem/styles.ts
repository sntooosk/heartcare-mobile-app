import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  textBotao: {
    fontWeight: "bold",
  },
  textPressure: {
    fontSize: 14,
    margin: 2,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between", // Adiciona espaço entre os botões
    marginVertical: 10, // Adiciona espaço vertical entre os botões e outros elementos
  },
  button: {
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 5,
    marginTop: 8,
  },
});
