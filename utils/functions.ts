import { CommonActions } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

export const resetStack = (navigation, initialRoute, params = {}) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{ name: initialRoute, params }],
    }),
  )
}

export const isToday = (dateString: string) => {
  const today = new Date()
  const date = new Date(dateString)
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

export const showToast = ({
  title = '',
  message = '',
  type,
  autoHide = true,
  topOffset = 40,
  visibilityTime = 3000,
  options = {},
}) => {
  title &&
    message &&
    type &&
    Toast.show({
      autoHide,
      type,
      topOffset,
      visibilityTime,
      text1: title,
      text2: message,
      ...options,
    })
}

export const truncateText = (text: string, maxLength: number = 20): string => {
  if (!text) return ''

  const formattedText = text.replace(/\n/g, ' ')

  return formattedText.length > maxLength
    ? `${formattedText.substring(0, maxLength)}...`
    : formattedText
}

export const sortOrdersByUpdatedAt = (orders: any[]) => {
  return orders.sort((a, b) => {
    if (a.updated_at && b.updated_at) {
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    }

    if (a.updated_at && !b.updated_at) {
      return -1
    }

    if (!a.updated_at && b.updated_at) {
      return 1
    }

    if (a.created_at && b.created_at) {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    }

    return 0
  })
}
