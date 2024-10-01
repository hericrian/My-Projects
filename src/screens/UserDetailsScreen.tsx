import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";

type UserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetails'>;

interface Props {
  navigation: UserDetailsScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'UserDetails'>;
}

const UserDetailsScreen: React.FC<Props> = ({ route }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.1.228:3000/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#6200ea" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Login: {user.login}</Text>
      <Text>Cidade: {user.city}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default UserDetailsScreen;
