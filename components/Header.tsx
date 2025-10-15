import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Modal from 'react-native-modal'

import { clear } from '@services/storage'
import { resetStack } from '@utils/functions'

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
                    <Image 
                        style={styles.logo} 
                        source={require('@assets/logo.png')} 
                    />
                    <Text style={styles.logoText}>
                        Darshan
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowAlert(true)}>
                    <Image 
                        style={styles.logout}
                        source={require('@assets/logout.png')}
                    />
                </TouchableOpacity>
            </View>

            <Modal
                isVisible={showAlert}
                onBackdropPress={() => setShowAlert(false)}
                useNativeDriver
                hideModalContentWhileAnimating
            >
                <View style={styles.modalContent}>
                    <Text style={styles.title}>
                        Sair
                    </Text>
                    <Text style={styles.descriptionText}>
                        Deseja realmente sair?
                    </Text>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={() => setShowAlert(false)} style={[styles.button, { backgroundColor: colors.GRAY_5 }]}>
                            <Text style={styles.buttonText}>
                                Não
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: colors.RED_1 }]}>
                            <Text style={styles.buttonText}>
                                Sair
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Header