import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

const Footer = () => {
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
    <Animated.View style={[styles.footer, { transform: [{ scale: scaleAnim }] }]}>
      <Text style={styles.text}>© 2024 - Developed by Héric Rían</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#6200ea",
    padding: 10,
    alignItems: "center",
    borderRadius: 15, // Torna o fundo arredondado
    marginHorizontal: 20, // Margem lateral para melhorar a estética
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});

export default Footer;
