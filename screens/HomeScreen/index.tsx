import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text, Alert, StyleSheet, BackHandler, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { getAllOrders } from '@services/ordersService'
import { isToday } from '@utils/functions'

import Header from '@components/Header'
import CardOrderComponent from './components/CardOrderComponent'
import FloatingActionButton from './components/FloatingActionButton'

import colors from '@styles/colors'

export default function HomeScreen() {
  const [orders, setOrders] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [pickedOrder, setPickedOrder] = useState<any>({})
  const [activeTab, setActiveTab] = useState<'today' | 'others'>('today')

  const navigation = useNavigation()

  const todayOrders = orders.filter(order => isToday(order.created_at))
  const otherOrders = orders.filter(order => !isToday(order.created_at))

  const displayedOrders = activeTab === 'today' ? todayOrders : otherOrders

  useEffect(() => {
    fetchOrders()
  }, [])

  useEffect(() => {
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => true)
    return () => subscription.remove()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await getAllOrders()
      setOrders(response)
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar pedidos')
    } finally {
      setLoading(false)
    }
  }

  const onRefresh = () => {
    setPickedOrder({})
    setOrders([])
    fetchOrders()
  }

  const handleAddOrder = () => {
    //@ts-ignore
    navigation.navigate('NewOrder')
  }

  const handleEditOrder = () => {
    if(pickedOrder.ped_id) {
        //@ts-ignore
        navigation.navigate('EditOrder')
      } else {
        Alert.alert('Nenhum pedido selecionado', 'Selecione um pedido para editar!')
      }
  }

  const handleCancelOrder = () => {
    if(pickedOrder.ped_id) {

    } else {
      Alert.alert('Nenhum pedido selecionado', 'Selecione um pedido para cancelar!')
    }
  }

  const handleFinishOrder = () => {
    if(pickedOrder.ped_id) {

    } else {
      Alert.alert('Nenhum pedido selecionado', 'Selecione um pedido para finalizar!')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
            Hoje
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'others' && styles.activeTab]}
          onPress={() => setActiveTab('others')}
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
            <View style={styles.withoutOrdersContainer}> 
              <Text style={{ color: colors.GRAY_5}}>
                  Nenhum pedido listado!
              </Text>
            </View>
          }
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
      ) :(
        <View style={styles.loadingContainer}>
          <ActivityIndicator
              size='large'
              color={colors.BLACK}
          />
        </View>
      )}
      <FloatingActionButton 
        onAdd={handleAddOrder}
        onEdit={handleEditOrder}
        onCancel={handleCancelOrder}
        onFinish={handleFinishOrder}
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
