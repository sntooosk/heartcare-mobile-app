import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  themeToggleButton: {
    position: "absolute",
    top: 40,
    right: 10,
    padding: 10,
    borderRadius: 5,
  },
  messageNop: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  userPostsContainer: {
    marginTop: 20,
    padding: 15,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: "100%",
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
