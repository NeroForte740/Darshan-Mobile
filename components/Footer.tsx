import React from 'react'
import { View, Text } from 'react-native'

import { getFooterStyles } from './styles'

const Footer = () => {
  const styles = getFooterStyles()

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.text}>
                    Todos os direitos reservados 2024-2025
                </Text>
            </View>
        </View>
    )
}

export default Footer
