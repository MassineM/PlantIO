import React, {useEffect, useState} from 'react';
import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Button from '../../../containers/Button/button';
import styles from '../../Dashboard/styles';
import spotsStyles from './styles';

export default function SpotsList(props) {
  const [spots, setSpots] = useState({});
  const user = auth().currentUser;
  const navigation = useNavigation();

  const getSpots = async () => {
    firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`plantations/${user.uid}/${props.plant.key}/spots`)
      .on('value', snapshot => {
        const item = [];
        snapshot.forEach(child => {
          item.push({
            id: child.key,
            ...child.val(),
          });
          setSpots(item);
        });
      });
  };
  useEffect(() => {
    getSpots();
  }, [props]);
  return (
    <View>
      <View style={styles.buttons}>
        <Button
          mode={'Add'}
          text="+   New Spot"
          do={() =>
            navigation.navigate('Add New Spot', {plantId: props.plant.key})
          }
        />
      </View>
      <View style={styles.list}>
        <FlatList
          data={spots}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[styles.pcard]}
              onPress={() =>
                navigation.navigate('Spot', {
                  spot: item,
                  plantId: props.plant.key,
                })
              }>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.info}>
                <Text style={styles.description}>
                  Description : {item.description}
                </Text>
              </View>
              <View style={styles.meanValues}>
                <View style={styles.description}>
                  <Text style={styles.values}>Temperature</Text>
                  <Text style={styles.values}>{item.realtimeTemp}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.values}>Humidity</Text>
                  <Text style={styles.values}>{item.realtimeHumd}</Text>
                </View>
                <View style={styles.description}>
                  <Text style={styles.values}>Luminosity</Text>
                  <Text style={styles.values}>{item.realtimeLum}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
