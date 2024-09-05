import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },

  postTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  postContent: {
    fontSize: 14,
    marginVertical: 10,
    lineHeight: 20,
  },

  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionIconContainer: {
    marginRight: 15,
  },

  saveIconContainer: {
    alignSelf: "flex-end",
  },
});
