import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { RootStackParamList } from "../types/navigationTypes"; // ajuste o caminho conforme necessário

type AddUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddUser'>;

interface Params {
  onGoBack: () => void;
}

interface Props {
  navigation: AddUserScreenNavigationProp;
  route: RouteProp<{ params: Params }, 'AddUser'>;
}

const AddUserScreen: React.FC<Props> = ({ navigation, route }) => {
  const { onGoBack } = route.params;

  const [name, setName] = useState("");
  const [city, setCity] = useState(""); // Novo estado para cidade
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(""); // Novo estado para login
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddUser = async () => {
    if (!name || !city || !email || !login || !password) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      // Verifica se o email ou login já estão em uso
      const response = await axios.get(`http://192.168.0.101:3000/users?email=${email}`);
      if (response.data.length > 0) {
        Alert.alert("Erro", "Este email já está em uso.");
        return;
      }

      const loginResponse = await axios.get(`http://192.168.0.101:3000/users?login=${login}`);
      if (loginResponse.data.length > 0) {
        Alert.alert("Erro", "Este login já está em uso.");
        return;
      }

      const userResponse = await axios.post("http://192.168.0.101:3000/users", {
        name,
        email,
        login, // Inclui login no cadastro
        password,
        city, // Inclui cidade no cadastro
      });

      Alert.alert("Usuário adicionado!", `ID: ${userResponse.data.id}`);
      onGoBack();
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      Alert.alert("Erro", "Não foi possível adicionar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Cidade" // Adiciona o campo de cidade
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Nome de Usuário" // Adiciona o campo de login
        value={login}
        onChangeText={setLogin}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Adicionar Usuário" onPress={handleAddUser} />
      {loading && <ActivityIndicator size="large" color="#6200ea" />} 
      <Text style={styles.infoText}>Preencha todos os campos para adicionar um usuário.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    borderColor: "#6200ea",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  infoText: {
    marginTop: 20,
    color: "#6200ea",
  },
});

export default AddUserScreen;
