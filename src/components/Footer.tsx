import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2024 - Developed by Héric Rían</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#6200ea",
    padding: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default Footer;