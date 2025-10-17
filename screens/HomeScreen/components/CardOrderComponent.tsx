import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { getCardOrderStyles } from '@styles/index'
import colors from '@styles/colors'

const CardOrderComponent = (props) => {
    const {
        order,
        index,
        pickedOrder,
        setPickedOrder,
    } = props

    const styles = getCardOrderStyles()

    const getStatusColor = (status) => {
        switch(status) {
            case 'Pago':
                return { backgroundColor: colors.GREEN_2, color: colors.GREEN_3 }
            case 'Pendente':
                return { backgroundColor: colors.YELLOW_1, color: colors.BROWN_1 }
            case 'Finalizado':
                return { backgroundColor: colors.BLUE_2, color: colors.BLUE_3 }
            case 'Em preparo':
                return { backgroundColor: colors.PURPLE_2, color: colors.PURPLE_3 }
            case 'Em transporte':
                return { backgroundColor: colors.ORANGE_1, color: colors.ORANGE_2 }
            default:
                return { backgroundColor: colors.WHITE, color: colors.BLACK }
        }
    }

    const orderPicked = {
        borderWidth: pickedOrder.ped_id === order.ped_id ? 2 : 1,
        borderColor: pickedOrder.ped_id === order.ped_id ? colors.PURPLE_1 : colors.GRAY_4,
        backgroundColor: pickedOrder.ped_id === order.ped_id ? colors.PURPLE_4 : colors.WHITE,
    }

    return (
        <TouchableOpacity 
            onPress={() => setPickedOrder(order)} 
            style={styles.container}
        >
            <View 
                key={index}
                tabIndex={index}
                style={[ styles.card, orderPicked ]}
            >
                <View style={styles.cardHeader}>
                    <View style={{ alignItems: 'flex-start'}}>
                        <Text style={styles.orderIdText}>
                            {`Pedido #${order.ped_id}`}
                        </Text>
                        <Text style={styles.customerNameText}>
                            {order.ped_client}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end', gap: 4 }}>
                        <Text style={[ styles.statusText, getStatusColor(order.ped_status_pag) ]}>
                            {order.ped_status_pag}
                        </Text>
                        <Text style={[ styles.statusText, getStatusColor(order.ped_status_preparo) ]}>
                            {order.ped_status_preparo}
                        </Text>
                    </View>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.orderDescriptionText}>
                        {order.ped_description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CardOrderComponent
