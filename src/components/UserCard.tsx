import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

// Defina os tipos para a navegação
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number };
};

type UserCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditUser" | "UserDetails"
>;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
  password: string;
  onDelete: (userId: number) => void; // Função para deletar usuário
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email, password, onDelete }) => {
  const navigation = useNavigation<UserCardNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState("");

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    setModalVisible(false);
    setPasswordModalVisible(true);
  };

  const handleViewUser = () => {
    navigation.navigate("UserDetails", { userId: id });
    setModalVisible(false);
  };

  const handlePasswordSubmit = () => {
    if (enteredPassword === password) {
      navigation.navigate("EditUser", { userId: id });
      setPasswordModalVisible(false);
      setEnteredPassword("");
    } else {
      Alert.alert("Erro", "Senha incorreta!");
      setEnteredPassword("");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja deletar este usuário?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () => {
            onDelete(id); // Chama a função de deletar usuário
            setModalVisible(false); // Fecha o modal
          },
        },
      ],
      { cancelable: true }
    );
  };

  const closeModal = () => {
    setModalVisible(false);
    setPasswordModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.card}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal de Opções */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma Opção</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleViewUser}>
              <Text style={styles.modalButtonText}>Ver Usuário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
              <Text style={styles.modalButtonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
              <Text style={styles.modalButtonText}>Deletar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para solicitar a senha */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={passwordModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite a Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={enteredPassword}
              onChangeText={setEnteredPassword}
            />
            <TouchableOpacity style={styles.modalButton} onPress={handlePasswordSubmit}>
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f3f3f3",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 2, // Adiciona a borda
    borderColor: "#6200ea", // Cor da borda roxa
    width: '95%', // Define a largura do card como 95% da tela
    alignSelf: 'center', // Centraliza o card na tela
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  modalButton: {
    backgroundColor: "#6200ea", // Cor do botão
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 5,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default UserCard;