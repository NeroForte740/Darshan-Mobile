import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

import { getCustomButtonStyles } from '@styles/index'
import colors from '@styles/colors'

interface CustomButtonProps {
  onPress: () => void
  text: string
  loading?: boolean
  loadingColor?: string
  backgroundColor?: string
  paddingVertical?: number
  borderRadius?: number
  marginTop?: number
  marginBottom?: number
  textColor?: string
  fontSize?: number
  maxWidth?: number
  testID?: string
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    onPress,
    text,
    loading,
    loadingColor = colors.WHITE,
    backgroundColor = colors.BLUE_1,
    paddingVertical,
    borderRadius,
    marginTop,
    marginBottom,
    textColor = colors.WHITE,
    fontSize = 16,
    maxWidth,
    testID,
  } = props

  const styles = getCustomButtonStyles(
    backgroundColor,
    paddingVertical,
    borderRadius,
    marginTop,
    marginBottom,
    textColor,
    fontSize,
    maxWidth,
  )

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={loading} testID={testID}>
      {loading ? (
        <ActivityIndicator color={loadingColor} testID="loading-indicator" />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton
