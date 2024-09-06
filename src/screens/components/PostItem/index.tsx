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

  // Função para calcular o tempo desde o post
  const tempoDesdePost = (data: Date) => {
    const agora = new Date();
    const dataPost = new Date(data);
    const diferencaMs = agora.getTime() - dataPost.getTime();
    
    const segundos = Math.floor(diferencaMs / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return `${dias} ${dias === 1 ? "dia" : "dias"} atrás`;
    }
    if (horas > 0) {
      return `${horas} ${horas === 1 ? "hora" : "horas"} atrás`;
    }
    if (minutos > 0) {
      return `${minutos} ${minutos === 1 ? "minuto" : "minutos"} atrás`;
    }
    return "Agora mesmo";
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
