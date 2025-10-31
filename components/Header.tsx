import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { clear } from '@services/storage'
import { resetStack } from '@utils/functions'

import CustomModal from '@components/CustomModal'

import { getHeaderStyles } from '@styles/index'
import colors from '@styles/colors'

const Header = () => {
  const [showAlert, setShowAlert] = useState(false)

  const navigation = useNavigation()

  const styles = getHeaderStyles()

  const handleLogo = () => {
    //@ts-ignore
    navigation.navigate('Home')
  }

  const handleLogout = async () => {
    await clear()
    resetStack(navigation, 'Login')
    setShowAlert(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.logoContainer} onPress={handleLogo}>
          <Image style={styles.logo} source={require('@assets/logo.png')} />
          <Text style={styles.logoText}>Darshan</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowAlert(true)}>
          <Image style={styles.logout} source={require('@assets/logout.png')} />
        </TouchableOpacity>
      </View>

      <CustomModal
        isVisible={showAlert}
        setVisible={() => setShowAlert(false)}
        title="Sair"
        descriptionText="Deseja realmente sair?"
        confirmButtonText="Sair"
        confirmButtonColor={colors.RED_1}
        onPressConfirmButton={handleLogout}
      />
    </View>
  )
}

export default Header
