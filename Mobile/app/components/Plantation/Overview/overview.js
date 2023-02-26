import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import styles from './styles';

export default function Overview(props) {
  const plant = props.plant;

  const getMeanTemp = plant => {
    if (plant.spots != undefined) {
      const spot = plant.spots;
      let sum = 0;
      let count = 0;
      Object.keys(spot).forEach(spotKey => {
        const currentSpot = spot[spotKey];
        sum += currentSpot.realtimeTemp;
        count++;
      });
      return sum / count;
    } else return 0;
  };
  const getMeanHum = plant => {
    if (plant.spots != undefined) {
      const spot = plant.spots;
      let sum = 0;
      let count = 0;
      Object.keys(spot).forEach(spotKey => {
        const currentSpot = spot[spotKey];
        sum += currentSpot.realtimeHumd;
        count++;
      });
      return (sum / count) * 10;
    } else return 0;
  };
  const getMeanLight = plant => {
    if (plant.spots != undefined) {
      const spot = plant.spots;
      let sum = 0;
      let count = 0;
      Object.keys(spot).forEach(spotKey => {
        const currentSpot = spot[spotKey];
        sum += currentSpot.realtimeLum;
        count++;
      });
      return sum / count;
    } else return 0;
  };

  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <CircularProgress
          value={plant.spots ? getMeanTemp(plant) : 0}
          radius={60}
          duration={2000}
          progressValueColor={'#000'}
          progressValueFontSize={25}
          maxValue={30}
          title={'°C'}
          titleColor={'black'}
        />
        <Text style={styles.gaugeTitle}>Température</Text>
      </View>
      <View style={styles.gaugeContainer}>
        <CircularProgress
          value={plant.spots ? getMeanHum(plant) : 0}
          radius={60}
          duration={2000}
          progressValueColor={'#000'}
          progressValueFontSize={25}
          maxValue={100}
          title={'%'}
          titleColor={'black'}
        />
        <Text style={styles.gaugeTitle}>Humidity</Text>
      </View>
      <View style={styles.gaugeContainer}>
        <CircularProgress
          value={plant.spots ? getMeanLight(plant) : 0}
          radius={60}
          duration={2000}
          progressValueColor={'#000'}
          progressValueFontSize={20}
          maxValue={10000}
          title={'Lux'}
          titleColor={'black'}
        />
        <Text style={styles.gaugeTitle}>Luminosity</Text>
      </View>
    </View>
  );
}
