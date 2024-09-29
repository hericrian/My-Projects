import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

// Definir o tipo de navegação e rotas
type RootStackParamList = {
  Home: undefined;
  EditUser: { userId: number }; // Especifica que EditUser espera um parâmetro userId do tipo número
};

type EditUserScreenRouteProp = RouteProp<RootStackParamList, 'EditUser'>;
type EditUserScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditUser'>;

type Props = {
  route: EditUserScreenRouteProp;
  navigation: EditUserScreenNavigationProp;
};

const EditUser: React.FC<Props> = ({ route, navigation }) => {
  const { userId } = route.params; // userId agora está tipado corretamente
  const [user, setUser] = useState({
    name: "",
    email: "",
    login: "",
    password: "",
    city: "",
  });

  // Carregar os dados do usuário
  useEffect(() => {
    fetch(`http://192.168.0.101:3000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Erro ao carregar dados do usuário:", error));
  }, [userId]);

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleUpdateUser = () => {
    fetch(`http://192.168.0.101:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Usuário atualizado com sucesso!");
        navigation.goBack(); // Volta para a tela anterior
      })
      .catch((error) => console.error("Erro ao atualizar o usuário:", error));
  };

  return (
    <View>
      <Text>DADOS DO USUÁRIO - {user.name} </Text>
      <TextInput
        placeholder="Nome"
        value={user.name}
        onChangeText={(value) => handleChange("name", value)}
      />
      <TextInput
        placeholder="Email"
        value={user.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        placeholder="Login"
        value={user.login}
        onChangeText={(value) => handleChange("login", value)}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={user.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      <TextInput
        placeholder="Cidade"
        value={user.city}
        onChangeText={(value) => handleChange("city", value)}
      />
      <Button title="Salvar" onPress={handleUpdateUser} />
    </View>
  );
};

export default EditUser;
