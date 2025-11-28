import { Platform, StyleSheet } from 'react-native'

import colors from '@styles/colors'

export const getCustomButtonStyles = (
  backgroundColor,
  paddingVertical,
  borderRadius,
  marginTop,
  marginBottom,
  textColor,
  fontSize,
  maxWidth,
) =>
  StyleSheet.create({
    button: {
      backgroundColor: backgroundColor,
      paddingVertical: paddingVertical,
      borderRadius: borderRadius,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: marginTop,
      marginBottom: marginBottom,
      width: '100%',
      maxWidth: maxWidth,
    },
    buttonText: {
      color: textColor,
      fontSize: fontSize,
      fontWeight: 500,
      textAlign: 'center',
    },
  })

export const getCustomInputStyles = (fontSize, multiline, maxWidth) =>
  StyleSheet.create({
    container: {
      maxWidth: maxWidth,
      width: '100%',
      gap: 4,
    },
    label: {
      fontSize: fontSize,
      color: colors.GRAY_2,
      textAlign: 'left',
      fontWeight: 400,
    },
    input: {
      width: '100%',
      paddingHorizontal: 8,
      paddingVertical: 12,
      borderWidth: 1,
      borderColor: colors.GRAY_3,
      borderRadius: 6,
      fontSize: fontSize,
      minHeight: multiline && 60,
      maxHeight: multiline && 60,
      textAlignVertical: 'top',
      backgroundColor: colors.WHITE,
    },
    toggleButton: {
      position: 'absolute',
      right: 2,
      paddingHorizontal: 8,
      paddingVertical: Platform.OS === 'ios' ? 10 : 12,
    },
    errorText: {
      fontSize: 12,
      color: colors.RED_1,
      textAlign: 'right',
    },
  })

export const getHeaderStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.GRAY_3,
      width: '100%',
      paddingVertical: 8,
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 30,
      height: 30,
      marginRight: 6,
    },
    logoText: {
      fontSize: 18,
      color: colors.BLACK,
      fontWeight: 500,
    },
    logout: {
      width: 30,
      height: 30,
    },
  })

export const getCardOrderStyles = () =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      marginBottom: 10,
    },
    card: {
      width: '100%',
      height: 120,
      borderRadius: 8,
      padding: 8,
      justifyContent: 'space-between',
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    orderIdText: {
      fontWeight: 600,
      fontSize: 16,
      color: colors.BLACK,
    },
    customerNameText: {
      fontSize: 14,
      color: colors.GRAY_5,
    },
    statusText: {
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 6,
      fontSize: 12,
      fontWeight: 500,
    },
    cardContent: {
      alignItems: 'flex-start',
      width: '100%',
    },
    orderDescriptionText: {
      fontWeight: 500,
      fontSize: 14,
      color: colors.GRAY_6,
    },
  })

export const getFloatingActionButtonStyles = () =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 50,
      right: 15,
    },
    fab: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.PURPLE_1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
    menu: {
      position: 'absolute',
      bottom: 60,
      right: 0,
    },
    menuItem: {
      width: 100,
      paddingVertical: 12,
      backgroundColor: colors.WHITE,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom: 10,
    },
    menuText: {
      color: colors.WHITE,
      fontWeight: 500,
      fontSize: 16,
    },
  })

export const getCustomPickerStyles = (fontSize, maxWidth) =>
  StyleSheet.create({
    container: {
      maxWidth: maxWidth,
      width: '100%',
      gap: 4,
    },
    label: {
      fontSize: fontSize,
      color: colors.GRAY_2,
      textAlign: 'left',
      fontWeight: 400,
    },
    picker: {
      width: '100%',
      borderWidth: 1,
      borderColor: colors.GRAY_3,
      backgroundColor: colors.WHITE,
      borderRadius: 6,
    },
  })

export const getCustomModalStyles = () =>
  StyleSheet.create({
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      width: '100%',
      gap: 20,
    },
    title: {
      fontWeight: 500,
      fontSize: 22,
    },
    descriptionText: {
      color: colors.BLACK,
      fontSize: 16,
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    },
  })
