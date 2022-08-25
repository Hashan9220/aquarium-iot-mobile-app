import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const RoundedButton = ({label, onPress}) => {
  return (
    <TouchableOpacity
      style={{alignItems: 'center', justifyContent: 'center'}}
      onPress={onPress}>
      <Text style={{fontSize: 15, color: '#e3e3da', fontWeight: 'normal'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedButton;
