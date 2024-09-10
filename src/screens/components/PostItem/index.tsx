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

  // Função para calcular o tempo desde o pst
  const tempoDesdePost = (data: Date) => {
    const agora = new Date();
    const dataPost = new Date(data);

    let anos = agora.getFullYear() - dataPost.getFullYear();
    let meses = agora.getMonth() - dataPost.getMonth();
    let dias = agora.getDate() - dataPost.getDate();
    let horas = agora.getHours() - dataPost.getHours();
    let minutos = agora.getMinutes() - dataPost.getMinutes();

    if (minutos < 0) {
      minutos += 60;
      horas--;
    }
    if (horas < 0) {
      horas += 24;
      dias--;
    }
    if (dias < 0) {
      const ultimoMes = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
      dias += ultimoMes;
      meses--;
    }
    if (meses < 0) {
      meses += 12;
      anos--;
    }

    if (anos > 0) {
      return `${anos} ${anos === 1 ? 'ano' : 'anos'} atrás`;
    } else if (meses > 0) {
      return `${meses} ${meses === 1 ? 'mês' : 'meses'} atrás`;
    } else if (dias > 0) {
      return `${dias} ${dias === 1 ? 'dia' : 'dias'} atrás`;
    } else if (horas > 0) {
      return `${horas} ${horas === 1 ? 'hora' : 'horas'} atrás`;
    } else if (minutos > 0) {
      return `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'} atrás`;
    } else {
      return "Agora mesmo";
    }
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
