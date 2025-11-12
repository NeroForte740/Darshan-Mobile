import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { cancelOrder, finishOrder, getAllOrders } from '@services/ordersService'
import { isToday, sortOrdersByUpdatedAt, showToast } from '@utils/functions'

import Header from '@components/Header'
import CustomModal from '@components/CustomModal'
import CardOrderComponent from './components/CardOrderComponent'
import FloatingActionButton from './components/FloatingActionButton'

import colors from '@styles/colors'

export default function Home() {
  const [orders, setOrders] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [pickedOrder, setPickedOrder] = useState<any>({})
  const [activeTab, setActiveTab] = useState<'today' | 'others'>('today')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showFinishModal, setShowFinishModal] = useState(false)
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [loadingFinish, setLoadingFinish] = useState(false)
  const [pendingToast, setPendingToast] = useState<any>(null)

  const navigation = useNavigation()

  const todayOrders = orders.filter(order => isToday(order.created_at))
  const otherOrders = orders.filter(order => !isToday(order.created_at))

  const displayedOrders = activeTab === 'today' ? todayOrders : otherOrders

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await getAllOrders()
      const sortedOrders = sortOrdersByUpdatedAt(response)
      setOrders(sortedOrders)
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

  const onRefresh = () => {
    setPickedOrder({})
    setOrders([])
    fetchOrders()
  }

  const onPressAddOrder = () => {
    //@ts-ignore
    navigation.navigate('NewOrder')
  }

  const onPressUpdateOrder = () => {
    if (!pickedOrder.ped_id) {
      showToast({
        type: 'info',
        title: 'Nenhum pedido selecionado',
        message: 'Selecione um pedido para editar!',
      })
      return
    }

    //@ts-ignore
    navigation.navigate('UpdateOrder', { order: pickedOrder })
  }

  const onPressCancelOrder = () => {
    if (!pickedOrder.ped_id) {
      showToast({
        type: 'info',
        title: 'Nenhum pedido selecionado',
        message: 'Selecione um pedido para cancelar!',
      })
      return
    }

    setShowCancelModal(true)
  }

  const onPressFinishOrder = () => {
    if (!pickedOrder.ped_id) {
      showToast({
        type: 'info',
        title: 'Nenhum pedido selecionado',
        message: 'Selecione um pedido para finalizar!',
      })
      return
    }

    if (pickedOrder.ped_status_pag !== 'Pago' || pickedOrder.ped_status_preparo !== 'Finalizado') {
      showToast({
        type: 'info',
        title: 'Aviso',
        message: `Pedido #${pickedOrder.ped_id} deve estar com status de Pago e de Finalizado`,
      })
      return
    }
    setShowFinishModal(true)
  }

  const handleCancelOrder = async () => {
    try {
      setLoadingCancel(true)
      await cancelOrder(pickedOrder.ped_id)

      const updatedOrders = orders.filter(order => order.ped_id !== pickedOrder.ped_id)
      setOrders(updatedOrders)

      setPendingToast({
        type: 'success',
        title: 'Sucesso!',
        message: `Pedido #${pickedOrder.ped_id} cancelado com sucesso!`,
      })
      setShowCancelModal(false)
      setPickedOrder({})
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro',
        message: error.message,
        topOffset: 0,
      })
    } finally {
      setLoadingCancel(false)
    }
  }

  const handleFinishOrder = async () => {
    try {
      setLoadingFinish(true)
      await finishOrder(pickedOrder.ped_id)

      const updatedOrders = orders.filter(order => order.ped_id !== pickedOrder.ped_id)
      setOrders(updatedOrders)

      setPendingToast({
        type: 'success',
        title: 'Sucesso!',
        message: `Pedido #${pickedOrder.ped_id} finalizado com sucesso!`,
      })
      setShowFinishModal(false)
      setPickedOrder({})
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Erro',
        message: error.message,
        topOffset: 0,
      })
    } finally {
      setLoadingFinish(false)
    }
  }

  const handleModalHide = () => {
    if (pendingToast) {
      showToast(pendingToast)
      setPendingToast(null)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
          testID="today-tab"
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>Hoje</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'others' && styles.activeTab]}
          onPress={() => setActiveTab('others')}
          testID="others-tab"
        >
          <Text style={[styles.tabText, activeTab === 'others' && styles.activeTabText]}>
            Outros
          </Text>
        </TouchableOpacity>
      </View>

      {!isLoading ? (
        <FlatList
          data={displayedOrders}
          renderItem={({ item, index }) => (
            <CardOrderComponent
              order={item}
              index={index}
              pickedOrder={pickedOrder}
              setPickedOrder={setPickedOrder}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.withoutOrdersContainer} testID="empty-orders-message">
              <Text style={{ color: colors.GRAY_5 }}>Nenhum pedido listado!</Text>
            </View>
          }
          refreshing={isLoading}
          onRefresh={onRefresh}
          testID="orders-list"
        />
      ) : (
        <View style={styles.loadingContainer} testID="loading-indicator">
          <ActivityIndicator size="large" color={colors.BLACK} />
        </View>
      )}
      <FloatingActionButton
        onAdd={onPressAddOrder}
        onUpdate={onPressUpdateOrder}
        onCancel={onPressCancelOrder}
        onFinish={onPressFinishOrder}
      />

      <CustomModal
        isVisible={showCancelModal}
        setVisible={() => setShowCancelModal(false)}
        title={`Pedido #${pickedOrder.ped_id}`}
        descriptionText="Deseja mesmo cancelar esse pedido?"
        confirmButtonText="Cancelar"
        confirmButtonColor={colors.RED_1}
        onPressConfirmButton={handleCancelOrder}
        loading={loadingCancel}
        onModalHide={handleModalHide}
      />

      <CustomModal
        isVisible={showFinishModal}
        setVisible={() => setShowFinishModal(false)}
        title={`Pedido #${pickedOrder.ped_id}`}
        descriptionText="Deseja mesmo finalizar esse pedido?"
        confirmButtonText="Finalizar"
        confirmButtonColor={colors.PURPLE_1}
        onPressConfirmButton={handleFinishOrder}
        loading={loadingFinish}
        onModalHide={handleModalHide}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: colors.PURPLE_1,
  },
  tabText: {
    fontSize: 16,
    color: colors.GRAY_5,
  },
  activeTabText: {
    color: colors.PURPLE_1,
    fontWeight: 600,
  },
  withoutOrdersContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
