import React, { useState } from 'react'
import { View, Text } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import { getCustomPickerStyles } from '@styles/index'
import colors from '@styles/colors'

interface CustomPickerProps {
  label: string
  fontSize: number
  selectedValue: string
  onValueChange: (e) => void
  options: Array<any>
  maxWidth?: number
  testID?: string
  zIndex?: number
}

const CustomPicker = (props: CustomPickerProps) => {
  const {
    label,
    fontSize,
    selectedValue,
    onValueChange,
    options,
    maxWidth,
    testID,
    zIndex = 1000,
  } = props
  const [open, setOpen] = useState(false)

  const styles = getCustomPickerStyles(fontSize, maxWidth)

  const items = options.map((option, index) => ({
    label: option.label,
    value: option.value,
    key: index.toString(),
  }))

  return (
    <View style={styles.container} testID={testID}>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={onValueChange}
        style={styles.picker}
        textStyle={{ fontSize: fontSize }}
        containerStyle={{ zIndex: zIndex }}
        dropDownContainerStyle={{ zIndex: zIndex, borderColor: colors.GRAY_3 }}
        listMode="SCROLLVIEW"
        testID={testID ? `${testID}-picker` : undefined}
      />
    </View>
  )
}

export default CustomPicker
