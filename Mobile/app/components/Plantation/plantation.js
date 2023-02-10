import React, {useState, useEffect} from 'react';
import {Image, Text, FlatList, TouchableOpacity, View} from 'react-native';
import SpotList from './Spots/spots';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Details from './Details/details';
import Button from '../../containers/Button/button';

export default function Plantation({route, navigation}) {
  const [plant, setPlant] = useState({});
  const [addSpot, setAddSpot] = useState(false);

  const user = auth().currentUser;

  const getPlant = async () => {
    firebase
      .app()

      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`plantations/${user.uid}/${route.params.plant.id}`)
      .on('value', snapshot => {
        let data = snapshot.val();
        let key = snapshot.key;
        setPlant({key: key, ...data});
      });
  };

  useEffect(() => {
    getPlant();
    console.log(plant);
  }, []);
  return (
    <View>
      <Details plant={plant} />
      <Button text="Ajouter un spot" do={() => setAddSpot(true)} />
      <SpotList plant={plant} />
    </View>
  );
}
