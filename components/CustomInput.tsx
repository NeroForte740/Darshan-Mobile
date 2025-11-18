import React, { useState } from 'react'
import { View, Text, TextInput, ReturnKeyTypeOptions, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { getCustomInputStyles } from '@styles/index'
import colors from '@styles/colors'

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
  testID?: string
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
    testID,
  } = props

  const styles = getCustomInputStyles(fontSize, multiline, maxWidth)
  const [isPasswordHidden, setPasswordHidden] = useState<boolean>(!!secureTextEntry)
  const effectiveSecure = !!secureTextEntry && isPasswordHidden

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ position: 'relative' }}>
        <TextInput
          style={[styles.input, { paddingRight: secureTextEntry ? 40 : 8 }]}
          keyboardType={keyboardType}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          numberOfLines={multiline && lines}
          secureTextEntry={effectiveSecure}
          ref={ref}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          autoCapitalize="none"
          testID={testID}
        />
        {secureTextEntry && (
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => setPasswordHidden(prev => !prev)}
            style={styles.toggleButton}
          >
            <Ionicons name={isPasswordHidden ? 'eye-off' : 'eye'} size={25} color={colors.GRAY_5} />
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  )
}

export default CustomInput
