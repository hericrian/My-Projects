import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

// URL da imagem de fundo
const backgroundImageUrl = {
  uri: "https://www.10wallpaper.com/wallpaper/medium/1411/Cool_Black_3D-Abstract_widescreen_wallpaper_medium.jpg",
};

// Componente BackgroundImage simplificado
const BackgroundImage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ImageBackground source={backgroundImageUrl} style={styles.background}>
      {children} {/* Renderiza os filhos diretamente */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundImage;
