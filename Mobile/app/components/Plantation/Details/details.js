import React, {useState} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';

export default function Details(props) {
  const plant = props.plant;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Nom de la plantation : </Text>
        <Text style={styles.values}>{plant.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Description :</Text>
        <Text style={styles.values}>{plant.description}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Température recommandée :</Text>
        <Text style={styles.values}> {plant.recommendedTemp}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Taux d'humidité recommandé :</Text>
        <Text style={styles.values}> {plant.recommendedHumd}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Luminosité recommandée :</Text>
        <Text style={styles.values}> {plant.recommendedLum}</Text>
      </View>
    </View>
  );
}
