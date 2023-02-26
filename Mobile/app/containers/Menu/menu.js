import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Button from '../Button/button';

export default function Menu(props) {
  // const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const output = [];

  // useEffect(() => {
  //   setItems(props.items);
  //   if (items.length == 3) {
  //     setLoading(true);
  //     console.log(items, 'items');
  //     console.log(loading, 'Loading');
  //     for (let index = 0; index < props.items.length; index++) {
  //       const element = props.items[index];
  //       let tempItem = <Text>{element.title}</Text>;
  //       output.push(tempItem);
  //     }
  //   }
  //   console.log(output, 'output');
  // }, [items]);

  return (
    <View style={styles.menuContainer}>
      <Button
        text={'Overview'}
        mode={'MenuButton-top'}
        do={() => {
          props.setMode(0);
        }}
      />
      <Button
        text={props.mode == true ? 'History' : 'Spots'}
        mode={'MenuButton-mid'}
        do={() => {
          props.setMode(1);
        }}
      />
      <Button
        text={'Details'}
        mode={'MenuButton-bot'}
        do={() => {
          props.setMode(2);
        }}
      />
      {/* <Text>Menu</Text>
      <View>{loading ? output : <Text>Loading ...</Text>}</View>
      {output} */}
    </View>
  );
}
