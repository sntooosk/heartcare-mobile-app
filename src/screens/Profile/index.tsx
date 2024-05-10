import React, { useState } from "react";
import { Text, View, Alert, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./styles";
import UserProfileForm from "../components/UserProfileForm";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import Header from "../components/Header";
import ProfileImage from "../components/ProfileImage";

function Profile() {
  const { signOut, authData } = useAuth();

  const user = authData;

  const { theme, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [isDayMode, setIsDayMode] = useState(true);

  const [token] = useState(user.token);
  const [username, setUsername] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState(user.name || "");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [editMode, setEditMode] = useState(false);

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
    } catch (error) {}
  };

  const handleSaveProfile = async () => {};

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDayMode(!isDayMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <View>
        <Header theme={theme} title="Perfil" />
      </View>

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
        {editMode && (
          <UserProfileForm
            username={username}
            name={name}
            lastName={lastName}
            dob={dob}
            number={number}
            email={email}
            genero={genero}
            setUsername={setUsername}
            setName={setName}
            setLastName={setLastName}
            setDob={setDob}
            setNumber={setNumber}
            setGenero={setGenero}
            setEmail={setEmail}
            handleSaveProfile={handleSaveProfile}
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
          <View style={styles.botoes}>
            <TouchableOpacity onPress={signOut}>
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
