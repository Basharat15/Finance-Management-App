import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Theme from '../utils/theme';

const CustomButton = ({onPress, title, customStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[customStyle, styles.containerStyle]}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    marginTop: '5%',
    backgroundColor: '#1b2434',
    padding: '5%',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Theme.white,
  },
});
export default CustomButton;
