import { StyleSheet } from 'react-native'

import colors from '@styles/colors'

export const getCustomButtonStyles = (backgroundColor, paddingVertical, paddingHorizontal, borderRadius, marginTop, marginBottom, textColor, textSize) => StyleSheet.create({
    button: {
        backgroundColor: backgroundColor,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
        borderRadius: borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: marginTop,
        marginBottom: marginBottom,
    },
    buttonText: {
        color: textColor,
        fontSize: textSize,
        fontWeight: 500,
        textAlign: 'center',
    },
})

export const getCustomInputStyles = (labelSize) => StyleSheet.create({
    container: {
        width: '100%',
        gap: 4,
    },
    label: {
        fontSize: labelSize,
        color: colors.GRAY_2,
        textAlign: 'left',
        fontWeight: 400,
    },
    input: {
        width: '100%',
        padding: 8,
        borderWidth: 1,
        borderColor: colors.GRAY_3,
        borderRadius: 6,
    },
    errorText: {
        fontSize: 12,
        color: colors.RED,
        textAlign: 'right',
        height: 16,
    },
})

export const getFooterStyles = () => StyleSheet.create({
    container: {
        backgroundColor: colors.GRAY_3,
        width: '100%',
        paddingVertical: 12,
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 10,
        color: colors.GRAY_2,
    },
})
