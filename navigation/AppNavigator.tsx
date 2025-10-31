import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '@screens/HomeScreen'
import LoginScreen from '@screens/LoginScreen'
import NewOrderScreen from '@screens/NewOrderScreen'
import UpdateOrderScreen from '@screens/UpdateOrderScreen'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const RootNavigator = undefined

  return (
    <Stack.Navigator id={RootNavigator} initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Darshan Mobile',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewOrder"
        component={NewOrderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateOrder"
        component={UpdateOrderScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
