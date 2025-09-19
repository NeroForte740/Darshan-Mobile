import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const RootNavigator = undefined

  return (
    <Stack.Navigator
      id={RootNavigator}
      initialRouteName="Home"
      screenOptions={{
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Darshan Mobile',
          headerShown: false
        }} 
      />
    </Stack.Navigator>
  );
}
