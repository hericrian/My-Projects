import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

type RouteParams = {
  userId: number;
};

const EditUserScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params as RouteParams; // Definindo o tipo da rota
  const [user, setUser] = useState<{ id: number; name: string; email: string }>({ id: 0, name: '', email: '' });

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://192.168.1.228:3000/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar detalhes do usuário:", error);
      Alert.alert("Erro", "Não foi possível buscar os detalhes do usuário.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpdateUser = async () => {
    if (!user.name || !user.email) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      await axios.put(`http://192.168.1.228:3000/users/${userId}`, user);
      Alert.alert("Sucesso", "Usuário atualizado com sucesso.");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <Button title="Salvar" onPress={handleUpdateUser} color="#6200ea" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6200ea",
  },
  input: {
    height: 50,
    borderColor: '#6200ea',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default EditUserScreen;
