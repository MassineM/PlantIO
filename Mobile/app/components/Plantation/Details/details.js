import React, {useState} from 'react';
import {View, Text} from 'react-native';

export default function Details(props) {
  const plant = props.plant;

  return (
    <View>
      <Text>Le nom de la plantation : {plant.name}</Text>
      <Text>Description : {plant.description}</Text>
      <Text>La température recommandée : {plant.recommandTemp}</Text>
      <Text>Le taux d'humidité recommandé : {plant.recommandHumd}</Text>
      <Text>La luminosité recommandée : {plant.recommandLum}</Text>
    </View>
  );
}
