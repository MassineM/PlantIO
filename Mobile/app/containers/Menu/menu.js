import React, {useState} from 'react';
import {FlatList, Text, TextInput, TouchableOpacity, View} from 'react-native';
import style from './styles';

export default function Menu() {
  return (
    <View style={style.container}>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        renderItem={({item}) => <Text style={style.title}>{item.key}</Text>}
      />
      <Text> Hello hello</Text>
      {/* <FlatList
        data={['Overview', 'Spots', 'Details']}
        renderItem={({item}) => <Text style={style.text}>{item}</Text>}
      /> */}
      {/* {props.text.map(text => (
        <View style={style.container}>
          <Text>{text}</Text>
        </View>
      ))} */}
    </View>
  );
}
