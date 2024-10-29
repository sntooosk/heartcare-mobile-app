import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import { propsStack } from "../../routes/types";

import { useTheme } from "../../context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

function Home() {
  const { navigate } = useNavigation<propsStack>();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: "#1F2937" }]}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Animatable.View
        delay={600}
        animation="fadeInUp"
        style={[
          styles.containerForm,
          { backgroundColor: theme.COLORS.BACKGROUND },
        ]}
      >
        <Animatable.Text
          animation="fadeInDown"
          duration={1500}
          style={[styles.title, { color: theme.COLORS.TITLE }]}
        >
          Cuide do seu coração
        </Animatable.Text>
        <Animatable.Text
          animation="fadeInDown"
          duration={1500}
          delay={300}
          style={[styles.text, { color: theme.COLORS.TITLE }]}
        >
          Faça login para começar
        </Animatable.Text>

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
