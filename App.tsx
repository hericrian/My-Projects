import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import AboutScreen from "./src/screens/AboutScreen";
import AddUserScreen from "./src/screens/AddUser"; 
import EditUser from "./src/screens/EditUser";
import HomeScreen from "./src/screens/HomeScreen";
import UserDetailsScreen from "./src/screens/UserDetailsScreen";
import { UserProvider } from "./context/UserContext"; 
import { RootStackParamList } from './src/types/navigation'; 

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
          tabBarLabel: "Início",
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

const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetailsScreen}
        options={{ title: "Detalhes do Usuário" }}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{ title: "Editar Usuário" }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUserScreen}
        options={{ title: "Adicionar Usuário" }}
      />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="HomeStack">
          <Drawer.Screen name="HomeStack" component={HomeStackNavigator} />
          <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
