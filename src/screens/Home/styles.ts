import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

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
    borderRadius: 10,
    paddingVertical: 8,
    width: "60%",
    alignSelf: "center",
    position: "absolute",
    bottom: "15%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  svgContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: -60,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.5,
    height: height * 0.5,
  },
});
