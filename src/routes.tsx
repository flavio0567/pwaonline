import React from 'react';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Main from './pages/Main';
import TakePicture from './pages/TakePicture';

const Tab = createBottomTabNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          options={{ tabBarIcon: ({ color }) => <Feather name="home" color={color} size={20}/> }}
          name="Main"
          component={Main}
        />
        <Tab.Screen
          options={{ tabBarIcon: ({ color }) => <Feather name="camera" color={color} size={20} /> }}
          name="Picture"
          component={TakePicture}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}