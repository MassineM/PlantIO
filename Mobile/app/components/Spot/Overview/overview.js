import {React, useState, useEffect} from 'react';
import {View, Text} from 'react-native';

import CircularProgress from 'react-native-circular-progress-indicator';
import styles from '../../Plantation/Overview/styles';

export default function Details(props) {
  const spot = props.spot;

  return (
    <View style={styles.container}>
      <View style={styles.gaugeContainer}>
        <CircularProgress
          value={spot.realtimeTemp ? spot.realtimeTemp : 0}
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
          value={spot.realtimeHumd ? spot.realtimeHumd * 10 : 0}
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
          value={spot.realtimeLum ? spot.realtimeLum : 0}
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
