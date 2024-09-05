import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { styles } from "./styles";
import * as Animatable from "react-native-animatable";
import { useTheme } from "../../../context/ThemeContext";
import shadow from "../../../utils/styles/index";
import Post from "../../../models/Post";

interface PostItemProps {
  post: Post;
  sharePost: (title: string, content: string) => void;
}

const PostItem = ({ post, sharePost }: PostItemProps) => {
  const { theme } = useTheme();

  const tempoDesdePost = (data: Date) => {
    const diferenca = new Date().getTime() - new Date(data).getTime();
    const minutos = Math.floor(diferenca / 60000);
    const horas = Math.floor(minutos / 60);

    return horas > 0
      ? `${horas} horas atrás`
      : minutos > 0
      ? `${minutos} minutos atrás`
      : "Agora mesmo";
  };

  return (
    <Animatable.View
      animation="fadeInUp"
      style={[
        styles.postContainer,
        {
          backgroundColor: theme.COLORS.BACKGROUND_CARD,
          ...shadow.shadowOverlay,
        },
      ]}
    >
      <Text style={[styles.postTitle, { color: theme.COLORS.TITLE }]}>
        {post.title}
      </Text>
      <Text style={[styles.postContent, { color: theme.COLORS.CONTENT }]}>
        {post.comment}
      </Text>
      <Text style={[styles.postContent, { color: theme.COLORS.CONTENT }]}>
        {tempoDesdePost(post.date)}
      </Text>

      <TouchableOpacity
        style={styles.saveIconContainer}
        onPress={() => sharePost(post.title, post.comment)}
      >
        <FontAwesome name="send-o" size={25} color={theme.COLORS.ICON} />
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default PostItem;
