import React, {useEffect, useState} from 'react';
import {Text, FlatList, View} from 'react-native';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import Button from '../../../containers/Button/button';

export default function SpotsList(props) {
  const [spots, setSpots] = useState({});
  const user = auth().currentUser;

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
  }, []);
  return (
    <View>
      <Text>Welcome to Spot list</Text>
      <FlatList
        data={spots}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Button
              text={item.name}
              do={() =>
                navigation.navigate('Spot', {
                  spot: item,
                  plantId: props.plant.key,
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}
