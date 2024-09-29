import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient"; // Importa o LinearGradient
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserCard from "../components/UserCard";

type User = {
  id: number;
  name: string;
  email: string;
};

const HomeScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://192.168.0.101:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`http://192.168.0.101:3000/users/${id}`);
      Alert.alert("Sucesso", "Usuário excluído com sucesso.");
      fetchUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  };

  const handleUserPress = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleOptionPress = (option: string) => {
    setModalVisible(false);
    if (option === "view") {
      navigation.navigate("UserDetails", { userId: selectedUser?.id });
    } else if (option === "edit") {
      navigation.navigate("EditUser", { userId: selectedUser?.id });
    } else if (option === "delete") {
      Alert.alert(
        "Confirmar Exclusão",
        "Você tem certeza que deseja excluir este usuário?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Excluir",
            onPress: () => deleteUser(selectedUser!.id),
          },
        ],
        { cancelable: true }
      );
    }
  };

  const handleAddUser = () => {
    navigation.navigate("AddUser", { onGoBack: fetchUsers });
  };

  return (
    <LinearGradient 
      colors={['#ffffff', '#000000']} // Degradê de branco para preto
      style={styles.container}
    >
      <Header />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard 
            id={item.id} 
            name={item.name} 
            email={item.email} 
            onPress={() => handleUserPress(item)}
          />
        )}
        contentContainerStyle={styles.list}
      />
      <Footer />
      {/* Botão Flutuante para Adicionar Usuário */}
      <TouchableOpacity style={styles.fab} onPress={handleAddUser}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal para opções de usuário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Opções do Usuário</Text>
            <Pressable style={styles.optionButton} onPress={() => handleOptionPress("view")}>
              <Text style={styles.optionText}>Ver Usuário</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={() => handleOptionPress("edit")}>
              <Text style={styles.optionText}>Editar Usuário</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={() => handleOptionPress("delete")}>
              <Text style={styles.optionText}>Excluir Usuário</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.optionText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100, // Espaço extra para o botão flutuante
  },
  fab: {
    position: "absolute",
    bottom: 60,
    right: 20,
    backgroundColor: "#6200ea",
    borderRadius: 30,
    padding: 15,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#6200ea",
  },
  optionButton: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: "#6200ea",
  },
  optionText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default HomeScreen;
