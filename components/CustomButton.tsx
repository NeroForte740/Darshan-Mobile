import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import { getCustomButtonStyles } from './styles';
import colors from '../styles/colors';

interface CustomButtonProps {
  onPress: () => void
  text: string
  loading?: boolean
  loadingColor?: string
  backgroundColor?: string
  textColor?: string
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    onPress,
    text,
    loading,
    loadingColor = colors.WHITE,
    backgroundColor = '#007AFF',
    textColor = colors.WHITE,
  } = props;

  const styles = getCustomButtonStyles(backgroundColor, textColor);

  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} />
      ) : (
        <Text style={styles.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
