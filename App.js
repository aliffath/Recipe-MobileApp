import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import Home from './src/screen/Home';
import MyRecipe from './src/screen/MyRecipe';
import Profile from './src/screen/Profile';
import SavedRecipe from './src/screen/SavedRecipe';
import LikedRecipe from './src/screen/LikedRecipe';
import Detail from './src/screen/Detail';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Search from './src/screen/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon name="home" size={25} />,
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={Search}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon name="search" size={25} />,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <Icon name="user" size={25} />,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="MyRecipe" component={MyRecipe} />
        <Stack.Screen name="Profile" component={HomeTabs} />
        <Stack.Screen name="SavedRecipe" component={SavedRecipe} />
        <Stack.Screen name="LikedRecipe" component={LikedRecipe} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="Search" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
