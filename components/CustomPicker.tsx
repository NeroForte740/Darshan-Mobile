import React from 'react'
import { View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker'

import { getCustomPickerStyles } from '@styles/index'

interface CustomPickerProps {
  label: string
  fontSize: number
  selectedValue: string
  onValueChange: (e) => void
  options: Array<any>
  maxWidth?: number
  testID?: string
}

const CustomPicker = (props: CustomPickerProps) => {
  const { label, fontSize, selectedValue, onValueChange, options, maxWidth, testID } = props

  const styles = getCustomPickerStyles(fontSize, maxWidth)

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={itemValue => onValueChange(itemValue)}
          testID={testID ? `${testID}-picker` : undefined}
        >
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  )
}

export default CustomPicker
