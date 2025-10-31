import React from 'react'
import { View, Text, TextInput, ReturnKeyTypeOptions } from 'react-native'

import { getCustomInputStyles } from '@styles/index'

interface CustomInputProps {
  label: string
  fontSize: number
  keyboardType?: string | any
  placeholder: string
  value: string
  onChangeText: (e) => void
  errorMessage?: string
  multiline?: boolean
  lines?: number
  secureTextEntry?: boolean
  ref?: any
  returnKeyType?: ReturnKeyTypeOptions
  onSubmitEditing?: () => void
  maxWidth?: number
}

const CustomInput = (props: CustomInputProps) => {
  const {
    label,
    fontSize,
    keyboardType,
    placeholder,
    value,
    onChangeText,
    errorMessage,
    multiline,
    lines,
    secureTextEntry,
    ref,
    returnKeyType,
    onSubmitEditing,
    maxWidth,
  } = props

  const styles = getCustomInputStyles(fontSize, multiline, maxWidth)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        keyboardType={keyboardType}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={multiline && lines}
        secureTextEntry={secureTextEntry}
        ref={ref}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  )
}

export default CustomInput
