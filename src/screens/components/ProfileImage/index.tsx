import React from "react";
import { TouchableOpacity, Platform, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // Importando o ícone de perfil
import { styles } from "./styles";
import shadow, { Theme } from "../../../utils/styles";

interface ProfileImageProps {
  photo: string | null;
  theme: Theme
  onPress: () => void;
}

export default function ProfileImage({ photo, onPress , theme}: ProfileImageProps) {
  return (
    <TouchableOpacity
      style={[
        styles.profileImageContainer,
        Platform.OS !== "web" && { ...shadow.shadowOverlay },
      ]}
      onPress={onPress}
    >
      {photo ? (
        <Image source={{ uri: photo }} style={styles.profileImage} />
      ) : (
        <FontAwesome name="user-circle-o" size={100} color={theme.COLORS.BACKGROUND} /> // Renderizando o ícone se não houver foto
      )}
    </TouchableOpacity>
  );
}
