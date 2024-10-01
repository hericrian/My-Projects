import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

// Defina o RootStackParamList se ainda não o fez
type RootStackParamList = {
  AddUser: { onGoBack: () => void }; // Definindo onGoBack como parte dos parâmetros
};

type AddUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddUser'>;

interface Props {
  navigation: AddUserScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'AddUser'>; // Usando o tipo correto
}

const AddUserScreen: React.FC<Props> = ({ navigation, route }) => {
  const { onGoBack } = route.params; // Obtendo a função onGoBack

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
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

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const userResponse = await axios.post("http://192.168.1.228:3000/users", {
        name,
        email,
        login,
        password,
        city,
      });

      Alert.alert("Usuário adicionado!", `ID: ${userResponse.data.id}`);
      onGoBack(); // Chama onGoBack após adicionar o usuário
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
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Cidade" value={city} onChangeText={setCity} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Nome de Usuário" value={login} onChangeText={setLogin} style={styles.input} />
      <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Adicionar Usuário" onPress={handleAddUser} disabled={loading} />
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
