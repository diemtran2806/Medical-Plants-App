import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';

const CustomButton = ({
  title,
  secondary,
  primary,
  disabled,
  loading,
  onPress,
}) => {
  const getBgColor = () => {
    if (disabled) {
      return 'rgba(121,174,165,0.22)';
    }
    if (primary) {
      return '#79AEA5';
    }
    if (secondary) {
      return 'rgba(217,217,217,0.5)';
    }
  };
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, {backgroundColor: getBgColor()}]}>
      <View style={styles.loaderSection}>
        {loading && <ActivityIndicator color="rgba(41,81,89,0.89761)" />}
        {title && (
          <Text
            style={{
              color: disabled ? 'white' : 'rgba(20,63,77,0.91)',
              paddingLeft: loading ? 5 : 0,
              fontSize: 18,
              fontWeight: 600,
            }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
