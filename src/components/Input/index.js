import React, {useState} from 'react';
import {View, ScrollView, TextInput, Text} from 'react-native';
import styles from './styles';

const Input = ({onChangeText, icon, style, value, label, error, ...props}) => {
  const [focused, setFocused] = useState(false);
  const getBorderColor = () => {
    if (error) {
      return '#79AEA5';
    }
    if (focused) {
      return 'none';
    } else {
      return 'none';
    }
  };
  return (
    <View style={styles.inputContainer}>
      {label && <Text style={{color: 'white', fontSize: 16}}>{label}</Text>}
      <View
        style={[
          styles.wrapper,
          {alignItems: icon ? 'center' : 'baseline'},
          {borderColor: getBorderColor()},
        ]}>
        <TextInput
          style={[styles.textInput, style, {color: 'white'}]}
          onChangeText={onChangeText}
          value={value}
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          {...props}
        />
        <View>{icon && icon}</View>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default Input;
