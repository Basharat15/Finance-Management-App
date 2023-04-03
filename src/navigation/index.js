import React from 'react';
import {Button, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import Dashboard, {
  screenOptions as dashboardScreenOptions,
} from '../screens/dashboard';
import Details from '../screens/details';
import Loans from '../screens/loans';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native';

const MainStack = createNativeStackNavigator();

const MainScreens = () => {
  const navigation = useNavigation();

  return (
    <MainStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: true}}>
      <MainStack.Screen
        name="Login"
        component={Login}
        options={{
          headerTintColor: '#d3d2ce',
          headerStyle: {backgroundColor: '#1b2434'},
        }}
      />
      <MainStack.Screen
        name="Financial Details"
        component={Dashboard}
        options={dashboardScreenOptions}
      />
      <MainStack.Screen
        name="Details"
        component={Details}
        options={{
          headerTintColor: '#d3d2ce',
          headerStyle: {backgroundColor: '#1b2434'},
        }}
      />
      <MainStack.Screen
        name="Add Data"
        component={Loans}
        options={{
          headerTintColor: '#d3d2ce',
          headerStyle: {backgroundColor: '#1b2434'},
        }}
      />
    </MainStack.Navigator>
  );
};

const Index = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        <MainStack.Screen name="MainStack" component={MainScreens} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
