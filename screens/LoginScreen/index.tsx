import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { loginUser } from '@services/authService'

import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'

import colors from '@styles/colors'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setLoading] = useState(false)

  const navigation = useNavigation()

  const handleLogin = async () => {
    setErrors({})

    const newErrors: any = {}
    if (!email) newErrors.email = 'Email é obrigatório'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido'
    }
    if (!password) newErrors.password = 'Senha é obrigatória'
    else if (password.length < 6) {
      newErrors.password = 'Senha deve possuir pelo menos 6 caracteres'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await loginUser({ email, password })
      //@ts-ignore
      navigation.navigate('Home')
    } catch (error) {
      setErrors({ backend: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior='padding' 
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image 
                  style={styles.logoImage} 
                  source={require('@assets/logo.png')} 
                  resizeMode='contain'
              />
              <Text style={styles.title}>
                  Darshan
              </Text>
            </View>

            <View style={styles.formContainer}>
              <CustomInput 
                label='E-mail'
                labelSize={18}
                placeholder='Insira seu e-mail'
                value={email}
                onChangeText={(e) => setEmail(e)}
                errorMessage={errors.email || ''}
                keyboardType={'email-address'}
              />
              <CustomInput 
                label='Senha'
                labelSize={18}
                placeholder='Insira sua senha'
                value={password}
                onChangeText={(e) => setPassword(e)}
                errorMessage={errors.password || ''}
                secureTextEntry
              />
              {errors.backend && (
                <Text style={styles.errorText}>{errors.backend}</Text>
                )
              }
              <View style={styles.buttonContainer}>
                <CustomButton 
                  onPress={() => handleLogin()}
                  text='Entrar'
                  backgroundColor={colors.PURPLE_1}
                  paddingVertical={8}
                  paddingHorizontal={60}
                  borderRadius={24}
                  loading={isLoading}
                  marginTop={10}
                />
              </View>
            </View>
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
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    maxWidth: 100,
    maxHeight: 100,
    marginBottom: 8,
  },
  title: {
    color: colors.BLACK,
    fontSize: 28,
    fontWeight: 500,
  },
  formContainer: {
    maxWidth: '75%',
    width: '100%',
    gap: 10,
  },
  errorText: {
    fontSize: 14,
    color: colors.RED_1,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
})
