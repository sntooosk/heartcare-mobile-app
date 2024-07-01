import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    margin: 15,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 12,
  },
  postContent: {
    fontSize: 13,
    marginBottom: 12,
  },
  actionIconContainer: {
    marginRight: 15,
  },
  saveIconContainer: {
    alignSelf: "flex-end",
  },
});
