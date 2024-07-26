import React, { useEffect, useState } from "react";
import { Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header";
import ProfileImage from "../components/ProfileImage";
import UserProfileForm from "../components/UserProfileForm";
import { styles } from "./styles";
import { update } from "../../api/requests/user/update";
import { get } from "../../api/requests/user/get";
import { convertPhotoToBytes } from "../../utils/ConvertPhotoBytes";
import UpdateUserDTO from "../../models/dto/UpdateUserDTO";

function Profile() {
  const { signOut, authData } = useAuth();
  const { email, id, token } = authData;
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isDayMode, setIsDayMode] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userCache = await get(id, token);
        setName(userCache.name || "");
        setLastName(userCache.lastname || "");
        setDob(userCache.dob || "");
        setPhoto(userCache.photo || null);
        setGender(userCache.gender || "");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Erro ao obter dados do usuário:", error);
      }
    };
    fetchUserData();
  }, [id, token]);

  const handleChoosePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permissão negada");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled && result.assets?.length > 0) {
        const supportedFormats = ["jpeg", "png", "jpg"];
        const fileExtension = result.assets[0].uri
          .split(".")
          .pop()
          .toLowerCase();
        if (supportedFormats.includes(fileExtension)) {
          setPhoto(result.assets[0].uri);
        } else {
          Alert.alert("Formato de imagem inválido");
        }
      }
    } catch (error) {
      console.error("Erro ao escolher a foto:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (!name || !lastName || !dob || !email) {
        Alert.alert("Erro", "Preencha todos os campos");
        setLoading(false);
        return;
      }
      if (!photo) {
        Alert.alert("Erro", "Adicione uma foto");
        setLoading(false);
        return;
      }
      const photoBytes = await convertPhotoToBytes(photo);
      const userCache: UpdateUserDTO = {
        id,
        name,
        lastname: lastName,
        gender,
        dob,
        photo: photoBytes,
        auth: { id },
      };
      await update(id, token, userCache);
      setLoading(false);
      Alert.alert("Perfil atualizado com sucesso!");
    } catch (error) {
      setLoading(false);
      console.error("Erro ao atualizar perfil:", error);
      Alert.alert("Erro ao atualizar perfil. Tente novamente mais tarde.");
    }
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDayMode(!isDayMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: "#1F2937" }]}>
      <Header theme={theme} title="Perfil" />
      <ProfileImage photo={photo} onPress={handleChoosePhoto} />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#1F2937" }]}
        onPress={handleEditClick}
      >
        <Text style={[styles.buttonText, { color: theme.COLORS.BUTTON_TEXT }]}>
          {editMode ? "Cancelar" : "Editar usuário"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.themeToggleButton,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
        onPress={handleToggleTheme}
      >
        <FontAwesome
          name={isDayMode ? "moon-o" : "sun-o"}
          size={25}
          color={theme.COLORS.ICON}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {editMode && (
          <UserProfileForm
            name={name}
            lastname={lastName}
            dob={dob}
            email={email}
            gender={gender}
            setName={setName}
            setLastName={setLastName}
            setDob={setDob}
            setGender={setGender}
            handleUpdate={handleUpdate}
            loading={loading}
            theme={theme}
          />
        )}
        <View
          style={[
            styles.userPostsContainer,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
        >
          <TouchableOpacity onPress={signOut}>
            <FontAwesome name="sign-out" size={30} color={theme.COLORS.ICON} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
