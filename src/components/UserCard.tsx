import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Defina os tipos para a navegação
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number }; // Adicione o EditUser com o parâmetro userId
};

type UserCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "EditUser" | "UserDetails"
>;

type UserCardProps = {
  id: number;
  name: string;
  email: string;
  password: string; // Inclua a senha do usuário
};

const UserCard: React.FC<UserCardProps> = ({ id, name, email, password }) => {
  const navigation = useNavigation<UserCardNavigationProp>();
  const [modalVisible, setModalVisible] = useState(false); // Estado para controle do modal
  const [passwordModalVisible, setPasswordModalVisible] = useState(false); // Estado para controle do modal de senha
  const [enteredPassword, setEnteredPassword] = useState(""); // Estado para a senha digitada

  const handlePress = () => {
    setModalVisible(true); // Abre o modal ao pressionar o card
  };

  const handleEdit = () => {
    setModalVisible(false); // Fecha o modal de opções
    setPasswordModalVisible(true); // Abre o modal de senha
  };

  const handleViewUser = () => {
    navigation.navigate("UserDetails", { userId: id }); // Navega para UserDetails
    setModalVisible(false); // Fecha o modal de opções
  };

  const handlePasswordSubmit = () => {
    // Verifica se a senha digitada está correta
    if (enteredPassword === password) {
      navigation.navigate("EditUser", { userId: id }); // Navega para EditUser se a senha estiver correta
      setPasswordModalVisible(false); // Fecha o modal de senha
      setEnteredPassword(""); // Limpa a senha digitada
    } else {
      // Alerta de senha incorreta
      Alert.alert("Erro", "Senha incorreta!"); 
      setEnteredPassword(""); // Limpa a senha digitada para nova tentativa
    }
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
        onRequestClose={() => setModalVisible(false)} // Fecha o modal ao pressionar fora
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma Opção</Text>
            <Button title="Ver Usuário" onPress={handleViewUser} />
            <Button title="Editar" onPress={handleEdit} />
            <Button title="Cancelar" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>

      {/* Modal para solicitar a senha */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={passwordModalVisible}
        onRequestClose={() => setPasswordModalVisible(false)} // Fecha o modal ao pressionar fora
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Digite a Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              value={enteredPassword}
              onChangeText={setEnteredPassword} // Atualiza o estado da senha
            />
            <Button title="Confirmar" onPress={handlePasswordSubmit} />
            <Button title="Cancelar" onPress={() => setPasswordModalVisible(false)} color="red" />
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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente
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
});

export default UserCard;
