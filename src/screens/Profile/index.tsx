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
import User from "../../models/User";
import { get } from "../../api/requests/user/get";

function Profile() {
  const { signOut, authData } = useAuth();
  const auth = authData;

  const email = auth.email;

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

        if (auth) {
          const userData = await get(auth.id);
          setName(userData.name || "");
          setLastName(userData.lastName || "");
          setDob(userData.dob || "");
          setPhoto(userData.photo || null);
          setGender(userData.gender || "");
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Erro ao obter dados do usuário:", error);
      }
    };

    fetchUserData();
  }, [auth]);

  const handleChoosePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permissão negada");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (
        result.canceled === false &&
        result.assets &&
        result.assets.length > 0
      ) {
        const supportedFormats = ["jpeg", "png", "jpg"];
        const uriParts = result.assets[0].uri.split(".");
        const fileExtension = uriParts[uriParts.length - 1].toLowerCase();

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
      const updatedUserData: User = {
        id: auth.id,
        name: name,
        lastname: lastName,
        gender: gender,
        dob: dob,
        auth: {
          id: auth.id,
        },
      };
      await update(auth.id, updatedUserData);
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
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <Header theme={theme} title="Perfil" />

      <ProfileImage photo={photo} onPress={handleChoosePhoto} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.COLORS.PRIMARY }]}
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
        <UserProfileForm
          name={name}
          lastName={lastName}
          dob={dob}
          email={email}
          gender={gender}
          setLastName={setLastName}
          setDob={setDob}
          setGender={setGender}
          handleUpdate={handleUpdate}
          loading={loading}
          theme={theme}
        />

        <View
          style={[
            styles.userPostsContainer,
            { backgroundColor: theme.COLORS.BACKGROUND },
          ]}
        >
          <View style={styles.botoes}>
            <TouchableOpacity onPress={() => signOut()}>
              <FontAwesome
                name="sign-out"
                size={30}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
