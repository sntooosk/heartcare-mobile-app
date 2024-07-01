import React, {  } from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../../../context/ThemeContext";
import shadow from '../../../utils/styles/index';
import Post from "../../../models/Post";

interface PostItemProps {
  post: Post;
  sharePost: (title: string, content: string) => void;
}

export default function PostItem({
  post,
  sharePost,
}: PostItemProps) {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.postContainer,
        { backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay
         },
      ]}
    >
  
      <Text style={[styles.postTitle, { color: theme.COLORS.TITLE }]}>
        {post.title}
      </Text>
      <Text style={[styles.postContent, { color: theme.COLORS.CONTENT }]}>
        {post.comment}
      </Text>

      <TouchableOpacity
        style={styles.saveIconContainer}
        onPress={() => sharePost(post.title, post.comment)}
      >
        <FontAwesome name="send-o" size={30} color={theme.COLORS.ICON} />
      </TouchableOpacity>
    </Animatable.View>
  );
}
