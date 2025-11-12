import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '@screens/Home'
import Login from '@screens/Login'
import NewOrder from '@screens/NewOrder'
import UpdateOrder from '@screens/UpdateOrder'

const Stack = createStackNavigator()

export default function AppNavigator() {
  const RootNavigator = undefined

  return (
    <Stack.Navigator id={RootNavigator} initialRouteName="Login">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Darshan Mobile',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NewOrder"
        component={NewOrder}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UpdateOrder"
        component={UpdateOrder}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
