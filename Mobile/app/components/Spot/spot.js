import React, {useEffect, useState} from 'react';
import {Text, FlatList, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Details from './Details/details';
import Overview from './Overview/overview';
import History from './History/history';

export default function Spot({route, navigation}) {
  const [spot, setSpot] = useState({});

  const user = auth().currentUser;

  const getSpot = async () => {
    firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(
        `plantations/${user.uid}/${route.params.plantID}/spots/${route.params.spot.id}`,
      )
      .on('value', snapshot => {
        let data = snapshot.val();
        let key = snapshot.key;
        setSpot({key: key, ...data});
      });
  };

  useEffect(() => {
    getSpot();
  }, []);

  return (
    <View>
      <Details spot={spot} />
      {/* <Overview spot={spot} />
            <History spot={spot} /> */}
    </View>
  );
}
