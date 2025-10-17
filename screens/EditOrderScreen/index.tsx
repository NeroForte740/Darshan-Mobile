import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Header from '@components/Header'
import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'

import colors from '@styles/colors'

export default function EditOrderScreen() {
  const [isLoading, setLoading] = useState(false)

  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.safeAreaView}>
        <Header />
        <KeyboardAvoidingView 
            style={styles.keyboardAvoidingView}
            behavior='padding' 
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.container}>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
})
