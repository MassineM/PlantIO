import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../Plantation/Details/styles';

export default function Details(props) {
  const spot = props.spot;

  return (
    // <View>
    //   <Text>Le nom du point : {spot.name}</Text>
    //   <Text>Description : {spot.description}</Text>
    //   <Text>Le nom du matériel utilis: {spot.materialName}</Text>
    //   <Text>La réference du matériel : {spot.materialRef}</Text>
    //   <Text>Valeur de la température: {spot.realtimeTemp}</Text>
    // </View>
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Nom du point :</Text>
        <Text style={styles.values}>{spot.name}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Description :</Text>
        <Text style={styles.values}>{spot.description}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Nom du matériel utilisé :</Text>
        <Text style={styles.values}> {spot.materialName}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.title}>Réference du matériel :</Text>
        <Text style={styles.values}> {spot.materialRef}</Text>
      </View>
    </View>
  );
}
