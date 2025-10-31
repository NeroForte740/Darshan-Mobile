import React from 'react'
import { Text, View } from 'react-native'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'

import CustomButton from '@components/CustomButton'

import { getCustomModalStyles } from '@styles/index'
import colors from '@styles/colors'

interface CustomModalProps {
  isVisible: boolean
  setVisible: () => void
  title: string
  descriptionText: string
  confirmButtonText: string
  confirmButtonColor: string
  onPressConfirmButton: () => void
  loading?: boolean
  onModalHide?: () => void
}

const CustomModal = (props: CustomModalProps) => {
  const {
    isVisible,
    setVisible,
    title,
    descriptionText,
    confirmButtonText,
    confirmButtonColor,
    onPressConfirmButton,
    loading,
    onModalHide,
  } = props

  const styles = getCustomModalStyles()

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setVisible()}
      useNativeDriver
      hideModalContentWhileAnimating
      onModalHide={onModalHide}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.descriptionText}>{descriptionText}</Text>
        <View style={styles.buttons}>
          <CustomButton
            onPress={() => setVisible()}
            text="Não"
            backgroundColor={colors.GRAY_5}
            paddingVertical={6}
            borderRadius={8}
            maxWidth={100}
            fontSize={14}
          />
          <CustomButton
            onPress={() => onPressConfirmButton()}
            text={confirmButtonText}
            backgroundColor={confirmButtonColor}
            paddingVertical={6}
            borderRadius={8}
            maxWidth={100}
            fontSize={14}
            loading={loading}
          />
        </View>
      </View>
      <Toast />
    </Modal>
  )
}

export default CustomModal
