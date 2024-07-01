import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 15,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
  },
  postContent: {
    fontSize: 12,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: "flex-end",
  },
  likerImage: {
    width: 25,
    height: 25,
    borderRadius: 8,
    marginRight: 2,
  },
});
