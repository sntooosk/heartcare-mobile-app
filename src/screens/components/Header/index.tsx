import React from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <View style={[styles.container, { backgroundColor: "#1F2937" }]}>
      <View style={styles.contain}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
}
