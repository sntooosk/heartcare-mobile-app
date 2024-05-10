import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";
import { Theme } from "../../../utils/styles";

interface HeaderProps {
  title: string;
  theme: Theme;
}
export default function Header({ title, theme }: HeaderProps) {
  return (
    <View style={[styles.container, { backgroundColor: theme.COLORS.PRIMARY }]}>
      <View style={styles.contain}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}
