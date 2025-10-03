import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import { getCustomButtonStyles } from './styles'
import colors from '@styles/colors'

interface CustomButtonProps {
  onPress: () => void
  text: string
  loading?: boolean
  loadingColor?: string
  backgroundColor?: string
  paddingVertical: number
  paddingHorizontal?: number
  borderRadius: number
  marginTop?: number
  marginBottom?: number
  textColor?: string
  textSize?: number
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    onPress,
    text,
    loading,
    loadingColor = colors.WHITE,
    backgroundColor = colors.BLUE,
    paddingVertical,
    paddingHorizontal,
    borderRadius,
    marginTop,
    marginBottom,
    textColor = colors.WHITE,
    textSize = 14,
  } = props

  const styles = getCustomButtonStyles(backgroundColor, paddingVertical, paddingHorizontal, borderRadius, marginTop, marginBottom, textColor, textSize)

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
