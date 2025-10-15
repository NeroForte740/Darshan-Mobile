import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { getFloatingActionButtonStyles } from '@styles/index'
import colors from '@styles/colors'

const FloatingActionButton = (props) => {
  const {
    onAdd, 
    onEdit, 
    onCancel, 
    onFinish,
  } = props

  const [showMenu, setShowMenu] = useState(false)

  const styles = getFloatingActionButtonStyles()

  const options = [
    { label: 'Adicionar', color: colors.BLUE_1, action: onAdd },
    { label: 'Editar', color: colors.GREEN_1, action: onEdit },
    { label: 'Cancelar', color: colors.RED_1, action: onCancel },
    { label: 'Finalizar', color: colors.PURPLE_1, action: onFinish },
  ]

  return (
    <View style={styles.container}>
      {showMenu && (
        <View style={styles.menu}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: option.color }]}
              onPress={() => {
                option.action()
              }}
            >
              <Text style={styles.menuText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowMenu(!showMenu)}
      >
        <Feather
          name={showMenu ? 'x' : 'plus'}
          size={22}
          color={colors.WHITE}
        />
      </TouchableOpacity>
    </View>
  )
}

export default FloatingActionButton
