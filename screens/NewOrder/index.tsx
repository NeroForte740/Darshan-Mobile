import React, { useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Header from '@components/Header'
import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'

import { createOrder } from '@services/ordersService'
import { resetStack, showToast } from '@utils/functions'

import colors from '@styles/colors'

export default function NewOrder() {
  const [isLoading, setLoading] = useState(false)
  const [orderClient, setOrderClient] = useState('')
  const [orderDescription, setOrderDescription] = useState('')

  const navigation = useNavigation()
  const orderClientInputRef = useRef<TextInput>(null)
  const orderDescriptionInputRef = useRef<TextInput>(null)

  const handleCreateOrder = async () => {
    if (!orderClient.length || !orderDescription.length) {
      showToast({
        type: 'info',
        title: 'Atenção',
        message: 'Preencha os campos para criar pedido!',
      })
      return
    }

    try {
      setLoading(true)
      await createOrder({
        client: orderClient,
        description: orderDescription,
      })

      showToast({
        type: 'success',
        title: 'Sucesso',
        message: 'Pedido criado com sucesso!',
      })
      setOrderClient('')
      setOrderDescription('')
      resetStack(navigation, 'Home')
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header />
      <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>Novo Pedido</Text>
            <CustomInput
              label="Cliente"
              fontSize={16}
              maxWidth={300}
              placeholder="Insira o nome do cliente"
              value={orderClient}
              onChangeText={e => setOrderClient(e)}
              ref={orderClientInputRef}
              returnKeyType="next"
              onSubmitEditing={() => orderDescriptionInputRef.current?.focus()}
              testID="client-input"
            />
            <CustomInput
              label="Descrição do Pedido"
              fontSize={16}
              maxWidth={300}
              placeholder="Ex: 2 - Água, 1 - Coca cola..."
              value={orderDescription}
              onChangeText={e => setOrderDescription(e)}
              ref={orderDescriptionInputRef}
              multiline={true}
              lines={2}
              testID="description-input"
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                onPress={() => handleCreateOrder()}
                text="Adicionar Pedido"
                backgroundColor={colors.BLUE_1}
                paddingVertical={8}
                borderRadius={24}
                maxWidth={250}
                loading={isLoading}
                testID="create-order-button"
              />
            </View>
          </View>
        </View>
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
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    maxWidth: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_3,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 32,
    gap: 20,
  },
  title: {
    color: colors.BLACK,
    fontWeight: 500,
    fontSize: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})
