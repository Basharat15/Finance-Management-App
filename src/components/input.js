import React from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

const Input = ({placeHolder, onChangeText, secureTextEntry, editable}) => {
  return (
    <TextInput
      placeholder={placeHolder}
      onChangeText={onChangeText}
      style={styles.input}
      secureTextEntry={secureTextEntry}
      editable={editable}
      placeholderTextColor={'black'}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#1b2434',
    marginTop: '8%',
    color: 'black',
  },
});
export default Input;
