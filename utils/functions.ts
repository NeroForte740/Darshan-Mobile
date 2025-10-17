import { CommonActions } from'@react-navigation/native'

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
