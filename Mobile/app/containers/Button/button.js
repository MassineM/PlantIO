import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

export default function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.do()}>
      <Text style={styles.buttonTitle}>{props.text}</Text>
    </TouchableOpacity>
  );
}
