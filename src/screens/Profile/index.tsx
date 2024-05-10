import React, { useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity, Alert, Text } from "react-native";
import { styles } from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { themes } from "../../utils/styles/colors";
import Header from "../components/Header";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { signOut, authData } = useAuth();

  const user = authData;

  const [token] = useState(user.token);
  const [name] = useState(user.name);
  const [email] = useState(user.email);

  return (
    <View
      style={[styles.container, { backgroundColor: themes.COLORS.PRIMARY }]}
    >
      <View>
        <Header title={`Olá ${name}`} />
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: themes.COLORS.PRIMARY }]}
      ></TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.userPostsContainer,
            { backgroundColor: themes.COLORS.BACKGROUND },
          ]}
        >
          <View style={styles.botoes}>
            <TouchableOpacity onPress={signOut}>
              <FontAwesome
                name="sign-out"
                size={30}
                color={themes.COLORS.TITLE}
              />
            </TouchableOpacity>
          </View>
          <Text>Token : {token}</Text>
          <Text>Email : {email}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
