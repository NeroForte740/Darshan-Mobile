import React from 'react'
import { View, Text, TextInput } from 'react-native'

import { getCustomInputStyles } from '@styles/index'

interface CustomInputProps {
  label: string
  labelSize: number
  keyboardType?: string | any
  placeholder: string
  value: string
  onChangeText: (e) => void
  errorMessage: string
  isTextArea?: boolean
  rows?: number
  secureTextEntry?: boolean
}

const CustomInput = (props: CustomInputProps) => {
  const {
    label,
    labelSize,
    keyboardType,
    placeholder,
    value,
    onChangeText,
    errorMessage,
    isTextArea,
    rows,
    secureTextEntry,
  } = props

  const styles = getCustomInputStyles(labelSize)

  return (
    <View style={styles.container}>
        <Text style={styles.label}>
            {label}
        </Text>
        <TextInput 
            style={styles.input}
            keyboardType={keyboardType}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            multiline={isTextArea}
            numberOfLines={isTextArea && rows}
            secureTextEntry={secureTextEntry}
        />
        {errorMessage && (
            <Text style={styles.errorText}>
                {errorMessage}
            </Text>
        )}
    </View>
  )
}

export default CustomInput
