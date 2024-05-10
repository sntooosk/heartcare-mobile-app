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
  languageToggleButton: {
    position: "absolute",
    top: 40,
    right: 60,
    padding: 10,
    borderRadius: 5,
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  messageNop: {
    alignItems: "center",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
  message: {
    fontSize: 28,
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
  userPostsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  profileImageContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  choosePhotoText: {
    fontSize: 20,
    color: "#F0F2F5",
    marginTop: 15,
  },

  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: "5%",
    paddingVertical: "5%",
  },
  title: {
    fontSize: 16,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    height: 25,
    marginBottom: 10,
    fontSize: 16,
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
