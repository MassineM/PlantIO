import React from 'react';
import {View, Text} from 'react-native';

export default function Details(props) {
  const spot = props.spot;

  return (
    <View>
      <Text>Le nom du point : {spot.name}</Text>
      <Text>Description : {spot.description}</Text>
      <Text>Le nom du matériel utilis: {spot.materialName}</Text>
      <Text>La réference du matériel : {spot.materialRef}</Text>
      <Text>Valeur de la température: {spot.realtimeTemp}</Text>
      <Text>Valeur du taux d'humidité: {spot.realtimeHumd}</Text>
      <Text>Valeur de la luminosité: {spot.realtimeLum}</Text>
    </View>
  );
}
