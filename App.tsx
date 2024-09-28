import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons"; // Importando os ícones
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import AboutScreen from "./src/screens/AboutScreen";
import EditUser from "./src/screens/EditUser"; // Importando o componente EditUser
import Background from "./src/components/BackgroundImage";

// Definindo os parâmetros que as telas esperam
type RootStackParamList = {
  Home: undefined;
  UserDetails: { userId: number };
  EditUser: { userId: number }; // Adicionando EditUser com o parâmetro userId
  Tabs: undefined;
};

// Criando o Tab Navigator
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={size} />
          ),
          tabBarLabel: "Início", // Altera o label se necessário
        }}
      />
      <Tab.Screen
        name="AboutTab"
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="information-circle-outline" color={color} size={size} />
          ),
          tabBarLabel: "Sobre",
        }}
      />
    </Tab.Navigator>
  );
};

// Criando o Stack Navigator para as telas Home, UserDetails e EditUser
const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }} // Oculta o header da navegação por tabs
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ title: "Detalhes do Usuário" }} // Mostra o título na tela de detalhes
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{ title: "Editar Usuário" }} // Mostra o título na tela de edição de usuário
      />
    </Stack.Navigator>
  );
};

// Criando o Drawer Navigator para Home, About, e Tabs
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeStack">
        <Drawer.Screen name="HomeStack" component={HomeStackNavigator} />
        <Drawer.Screen name="About" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
