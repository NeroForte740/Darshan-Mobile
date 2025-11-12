// Jest Native matchers
import '@testing-library/jest-native/extend-expect'

// Gesture Handler setup
import 'react-native-gesture-handler/jestSetup'

// AsyncStorage mock (corrige erro NativeModule: AsyncStorage is null)
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

// Toast mock
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}))

// Safe area mock
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
}))

// Navigation mock
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native')
  return {
    ...actual,
    useNavigation: () => ({ navigate: jest.fn(), reset: jest.fn(), goBack: jest.fn() }),
    NavigationContainer: ({ children }) => children,
    createNavigationContainerRef: () => ({
      isReady: () => true,
      navigate: jest.fn(),
    }),
  }
})

// Mock Stack navigator to simple pass-through components
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}))

// Mock expo vector icons to avoid expo-modules-core dependency in tests
jest.mock('@expo/vector-icons', () => {
  const React = require('react')
  const { Text } = require('react-native')
  const MockIcon = ({ name = 'Icon' }) => React.createElement(Text, null, name)
  return {
    Feather: MockIcon,
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    default: MockIcon,
  }
})

// Timers
jest.useFakeTimers()
