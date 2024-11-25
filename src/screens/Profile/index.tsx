import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import Header from "../components/Header";
import ProfileImage from "../components/ProfileImage";
import UserProfileForm from "../components/UserProfileForm";
import { styles } from "./styles";
import { convertPhotoToBytes } from "../../utils/ConvertPhotoBytes";
import UpdateUserDTO from "../../models/dto/UpdateUserDTO";
import { getUserById } from "../../api/requests/user/get";
import { updateUser } from "../../api/requests/user/update";

function Profile() {
  const { signOut, authData } = useAuth();
  const { email, id, token } = authData;
  const { theme, toggleTheme } = useTheme();
  const { showToast } = useToast();
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
        const userCache = await getUserById(id, token);
        setName(userCache.name || "");
        setLastName(userCache.lastname || "");
        setDob(userCache.dob || "");
        setPhoto(userCache.photo || null);
        setGender(userCache.gender || "");
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showToast("error", "Erro ao obter dados do usuário");
        console.error("Erro ao obter dados do usuário:", error);
      }
    };
    fetchUserData();
  }, [id, token, showToast]);

  const handleChoosePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        showToast("error", "Permissão negada");
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
        const fileExtension = result.assets[0].uri.split(".").pop().toLowerCase();
        if (supportedFormats.includes(fileExtension)) {
          setPhoto(result.assets[0].uri);
        } else {
          showToast("error", "Formato de imagem inválido");
        }
      } else {
        // Se o usuário cancelou a escolha de foto, você pode definir como null
        setPhoto(null);
      }
    } catch (error) {
      console.error("Erro ao escolher a foto:", error);
      showToast("error", "Erro ao escolher a foto");
    }
  };
  

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (!name || !lastName || !dob || !email) {
        showToast("error", "Preencha todos os campos");
        setLoading(false);
        return;
      }
      
      let photoBytes = photo ? await convertPhotoToBytes(photo) : null;
  
      const userCache: UpdateUserDTO = {
        id,
        name,
        lastname: lastName,
        gender,
        dob,
        photo: photoBytes,
        auth: { id },
      };
  
      await updateUser(id, token, userCache);
      setLoading(false);
      showToast("success", "Perfil atualizado com sucesso!");
    } catch (error) {
      setLoading(false);
      showToast(
        "error",
        "Erro ao atualizar perfil. Tente novamente mais tarde."
      );
      console.error("Erro ao atualizar perfil:", error);
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
      <Header title="Perfil" />
      <ProfileImage photo={photo} theme={theme} onPress={handleChoosePhoto} />
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
