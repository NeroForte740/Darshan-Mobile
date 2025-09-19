import { StyleSheet } from "react-native";

export const getCustomButtonStyles = (backgroundColor, textColor) => StyleSheet.create({
    button: {
        backgroundColor: backgroundColor,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 44,
    },
    buttonText: {
        color: textColor,
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
});
