import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { propsStack } from "../../routes/types";

import MainIllustrationSvg from "../../assets/svg/main-illustration.svg";
import { useTheme } from "../../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

function Home() {
  const { navigate } = useNavigation<propsStack>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <MainIllustrationSvg width={400} height={400} />

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={[
          styles.containerForm,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
      >
        <Text style={[styles.title, { color: theme.COLORS.TITLE }]}>
          Cuide do seu coração
        </Text>
        <Text style={{ color: theme.COLORS.TITLE }}>
          Faça login para começar
        </Text>

        <TouchableOpacity
          style={[
            styles.buttonAcessar,
            { backgroundColor: theme.COLORS.BUTTON },
          ]}
          onPress={() => navigate("SignIn")}
        >
          <AntDesign name="arrowright" size={30} color={theme.COLORS.WHITE} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

export default Home;
