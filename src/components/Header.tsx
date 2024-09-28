import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>User List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200ea",
    padding: 5,
    paddingTop: 2,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});

export default Header;