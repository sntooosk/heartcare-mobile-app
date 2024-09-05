import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionContainer: {
    margin: 15,
    borderRadius: 20,
    padding: 5,
    marginBottom: 5,
  },
  questionText: {
    fontSize: 13,
    fontWeight: "bold",
    padding: 16,
  },
  answerText: {
    fontSize: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  button: {
    width: "100%",
    borderRadius: 10,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonToggleContainer: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonToggle: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    marginRight: 10,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
