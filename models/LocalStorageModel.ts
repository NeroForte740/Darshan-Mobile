import AsyncStorage from '@react-native-async-storage/async-storage'

export const saveItemByKey = async (
  key: string,
  data: any,
  type: 'string' | 'object' = 'object',
): Promise<any> => {
  let dataToSave: any

  if (type === 'object') {
    dataToSave = JSON.stringify(data)
  } else {
    dataToSave = data
  }

  await AsyncStorage.setItem(key, dataToSave)
}

export const getItemByKey = async (
  key: string,
  type: 'string' | 'object' = 'object',
): Promise<any> => {
  const itemString: string = (await AsyncStorage.getItem(key)) || (type === 'string' ? '' : '{}')

  if (type === 'object') {
    return JSON.parse(itemString)
  }

  return itemString
}

export const clear = async () => {
  await AsyncStorage.clear()
}

export default {
  saveItemByKey,
  getItemByKey,
  clear,
}
