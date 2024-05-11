import React, { useState, useEffect } from "react";
import { Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header";
import ProfileImage from "../components/ProfileImage";
import UserProfileForm from "../components/UserProfileForm";
import { styles } from "./styles";
import { getProfile } from "../../api/user/get";
import { createProfile } from "../../api/user/create";

function Profile() {
  const { signOut, authData } = useAuth();
  const user = authData;
  const email = user.email;
  const name = user.name;
  const user_id = user.token;
  const authorization = user.token;

  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [isDayMode, setIsDayMode] = useState(true);

  const [photo, setPhoto] = useState<string | null>(null);
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [gender, setGender] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const dataUser = await getProfile(authorization);

      setPhoto(dataUser.photo || null);
      setLastName(dataUser.lastName || "");
      setDob(dataUser.dob || "");
      setNumber(dataUser.number || "");
      setGender(dataUser.gender || "");
    } catch (error) {
      console.error("Erro ao carregar perfil de usuário:", error);
    }
  };

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

  const handleSaveProfile = async () => {
    try {
      setLoading(true);

      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado");
        setLoading(false);
        return;
      }


      if (!name || !lastName || !dob || !email || !number) {
        Alert.alert("Erro", "Preencha todos os campos");
        setLoading(false);
        return;
      }

      // Enviar credenciais para a API usando axios
      await createProfile({
        id_user: user_id,
        name: name,
        lastName: lastName,
        dob: dob,
        number: number,
        gender: gender,
        email: email,
        photo: photo,
      }, authorization);

      setLoading(false);
      setEditMode(false);
      Alert.alert("Alterado com sucesso");
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Erro",
        "Houve um erro ao salvar o perfil. Tente novamente mais tarde."
      );
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
          number={number}
          email={email}
          gender={gender}
          setLastName={setLastName}
          setDob={setDob}
          setNumber={setNumber}
          setGender={setGender}
          handleSaveProfile={handleSaveProfile}
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
