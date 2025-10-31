import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Header from '@components/Header'
import CustomButton from '@components/CustomButton'
import CustomInput from '@components/CustomInput'

import { updateOrder } from '@services/ordersService'
import { resetStack, showToast } from '@utils/functions'

import colors from '@styles/colors'
import CustomPicker from '@components/CustomPicker'

export default function UpdateOrderScreen({ route }) {
  const { order } = route.params

  const [isLoading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(order.ped_status_pag)
  const [orderStatus, setOrderStatus] = useState(order.ped_status_preparo)
  const [orderClient, setOrderClient] = useState(order.ped_client)
  const [orderDescription, setOrderDescription] = useState(order.ped_description)

  const navigation = useNavigation()

  const paymentStatusOptions = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Pago', label: 'Pago' },
  ]

  const orderStatusOptions = [
    { value: 'Em preparo', label: 'Em preparo' },
    { value: 'Em transporte', label: 'Em transporte' },
    { value: 'Finalizado', label: 'Finalizado' },
  ]

  const handleUpdateOrder = async () => {
    if (!paymentStatus.length || !orderStatus.length || !orderDescription.length) {
      showToast({
        type: '',
        title: 'Atenção',
        message: 'Preencha a descrição do pedido',
      })
      return
    }

    try {
      setLoading(true)
      await updateOrder(order.ped_id, {
        ...order,
        ped_status_preparo: orderStatus,
        ped_status_pag: paymentStatus,
        ped_client: orderClient,
        ped_description: orderDescription,
      })

      showToast({
        type: 'success',
        title: 'Sucesso!',
        message: `Pedido #${order.ped_id} editado com sucesso!`,
      })
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <View style={styles.card}>
              <Text style={styles.title}>{`Pedido #${order.ped_id}`}</Text>
              <CustomPicker
                label="Status de Pagamento"
                fontSize={16}
                maxWidth={300}
                selectedValue={paymentStatus}
                onValueChange={e => setPaymentStatus(e)}
                options={paymentStatusOptions}
              />
              <CustomPicker
                label="Status do Pedido"
                fontSize={16}
                maxWidth={300}
                selectedValue={orderStatus}
                onValueChange={e => setOrderStatus(e)}
                options={orderStatusOptions}
              />
              <CustomInput
                label="Cliente"
                fontSize={16}
                maxWidth={300}
                placeholder="Insira o nome do cliente"
                value={orderClient}
                onChangeText={e => setOrderClient(e)}
              />
              <CustomInput
                label="Descrição do Pedido"
                fontSize={16}
                maxWidth={300}
                placeholder="Ex: 2 - Água, 1 - Coca cola..."
                value={orderDescription}
                onChangeText={e => setOrderDescription(e)}
                multiline={true}
                lines={2}
              />
              <View style={styles.buttonContainer}>
                <CustomButton
                  onPress={() => handleUpdateOrder()}
                  text="Editar Pedido"
                  backgroundColor={colors.GREEN_1}
                  paddingVertical={8}
                  borderRadius={24}
                  maxWidth={250}
                  loading={isLoading}
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
  },
  card: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.GRAY_3,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
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
    paddingTop: 10,
  },
})
