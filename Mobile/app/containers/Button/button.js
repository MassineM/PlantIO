import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export default function Button(props) {
  return (
    <TouchableOpacity
      style={
        props.mode == 'Add'
          ? styles.buttonAdd
          : props.mode == 'logout'
          ? styles.buttonLogout
          : props.mode == 'MenuButton-top'
          ? styles.MenuButtonTop
          : props.mode == 'MenuButton-mid'
          ? styles.MenuButtonMid
          : props.mode == 'MenuButton-bot'
          ? styles.MenuButtonBot
          : styles.MenuButtonMid
      }
      onPress={() => props.do()}>
      {props.mode == 'logout' ? (
        <Image
          source={require('../../assets/exit.png')}
          style={{width: 17, height: 19}}
        />
      ) : (
        <Text style={styles.buttonTitle}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
}
