import { saveItemByKey, getItemByKey } from '@models/LocalStorageModel'

const keys = {
  auth: 'AUTH',
  user: 'USER',
}

type AuthProps = {
  token: string
}

export const setAuth = async (auth: AuthProps | string) => {
  await saveItemByKey(keys.auth, auth)
}

export const getAuth = async (): Promise<AuthProps> => {
  return await getItemByKey(keys.auth)
}

export const getToken = async (): Promise<string> => {
  const auth: AuthProps = await getItemByKey(keys.auth)

  return auth.token
}

export const setUser = async user => {
  await saveItemByKey(keys.user, user)
}

export const getUser = async () => {
  return await getItemByKey(keys.user)
}

export const clear = async () => {
  await saveItemByKey(keys.auth, '')
  await saveItemByKey(keys.user, '')
}

export default {
  setAuth,
  getAuth,
  getToken,
  setUser,
  getUser,
  clear,
}
