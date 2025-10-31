import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

import AppNavigator from './navigation/AppNavigator'
import { navigationRef } from './hooks/useNavigation'

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </SafeAreaProvider>
  )
}

export default App
