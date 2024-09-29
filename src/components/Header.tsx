import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

const Header = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // Valor inicial da animação

  useEffect(() => {
    // Inicia a animação quando o componente é montado
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1, // Escala para 110%
          duration: 500, // Duração da animação
          useNativeDriver: true, // Usa o driver nativo para melhor desempenho
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Retorna à escala original
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <Animated.View style={[styles.header, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.title}>User List</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200ea",
    padding: 5,
    paddingTop: 2,
    alignItems: "center",
    borderRadius: 15, // Torna o fundo arredondado
    marginHorizontal: 20, // Margem lateral para melhorar a estética
  },
  title: {
    fontSize: 20,
    color: "white",
  },
});

export default Header;
