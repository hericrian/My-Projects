import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native"; // Importa o hook de navegação
import Header from "../components/Header";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";

type User = {
  id: number;
  name: string;
  email: string;
};

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation(); // Adiciona o hook de navegação

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://192.168.0.103:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserPress = (id: number) => {
    // Exibe um alerta para o usuário escolher Editar
    Alert.alert(
      "Ações do Usuário",
      "Escolha uma opção",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Editar Usuário",
          onPress: () => navigation.navigate("EditUser", { userId: id }), // Navega para a tela EditUser
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard 
            id={item.id} 
            name={item.name} 
            email={item.email} 
            onPress={() => handleUserPress(item.id)} // Exibe as opções ao pressionar o card
          />
        )}
        contentContainerStyle={styles.list}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  list: {
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
