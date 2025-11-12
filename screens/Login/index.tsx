import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { loginUser } from '@services/authService'
import { showToast } from '@utils/functions'

import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'

import colors from '@styles/colors'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [isLoading, setLoading] = useState(false)

  const navigation = useNavigation()
  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)

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
      showToast({
        type: 'error',
        title: 'Erro de autenticação',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logoImage}
                source={require('@assets/logo.png')}
                resizeMode="contain"
              />
              <Text style={styles.title}>Darshan</Text>
            </View>

            <View style={styles.formContainer}>
              <CustomInput
                label="E-mail"
                fontSize={16}
                maxWidth={300}
                placeholder="Insira seu e-mail"
                value={email}
                onChangeText={e => setEmail(e)}
                errorMessage={errors.email || ''}
                keyboardType={'email-address'}
                ref={emailInputRef}
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
                testID="email-input"
              />
              <CustomInput
                label="Senha"
                fontSize={16}
                maxWidth={300}
                placeholder="Insira sua senha"
                value={password}
                onChangeText={e => setPassword(e)}
                errorMessage={errors.password || ''}
                secureTextEntry
                ref={passwordInputRef}
                returnKeyType="send"
                onSubmitEditing={handleLogin}
                testID="password-input"
              />

              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => handleLogin()}
                  text="Entrar"
                  backgroundColor={colors.PURPLE_1}
                  paddingVertical={8}
                  borderRadius={24}
                  maxWidth={180}
                  loading={isLoading}
                  testID="login-button"
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
    maxWidth: 120,
    maxHeight: 120,
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
})
