import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';

const Message = ({
  message,
  onDismiss,
  retry,
  retryFn,
  primary,
  danger,
  info,
  success,
}) => {
  const getBgColor = () => {
    if (primary) {
      return '#79AEA5';
    }
    if (danger) {
      return 'yellow';
    }
    if (success) {
      return 'green';
    }
    if (info) {
      return 'blue';
    }
  };
  return (
    <TouchableOpacity style={[styles.wrapper, {backgroundColor: getBgColor()}]}>
      <View style={styles.loaderSection}>
        <Text
          style={{
            color: 'white',
            paddingLeft: loading ? 5 : 0,
            fontSize: 18,
            fontWeight: 600,
          }}>
          {message}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
