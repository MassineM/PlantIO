import React, {useEffect, useState} from 'react';
import {Text, FlatList, View, ImageBackground, Dimensions} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Details from './Details/details';
import Overview from './Overview/overview';
import History from './History/history';
import Menu from '../../containers/Menu/menu';
import styles from '../Plantation/styles';

export default function Spot({route, navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [spot, setSpot] = useState({});
  const [mode, setMode] = useState(0); // 0 = Overview, 1 = Details, 2 = History

  const menuItem = [
    {title: 'Overview', mode: 0},
    {title: 'Details', mode: 1},
    {title: 'History', mode: 2},
  ];
  const user = auth().currentUser;

  const getSpot = async () => {
    firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(
        `plantations/${user.uid}/${route.params.plantId}/spots/${route.params.spot.id}`,
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
    <SafeAreaProvider style={{flex: 1, height: '100%'}}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        <ImageBackground
          source={require('../../assets/background-1.png')}
          imageStyle={{
            opacity: 0.1,
            resizeMode: 'cover',
            height: screenHeight,
            width: screenWidth,
          }}
          resizeMode="cover">
          <Text style={styles.title}>{spot.name}</Text>
          <Menu mode={true} setMode={m => setMode(m)} />
          {mode == 2 && <Details spot={spot} />}
          {mode == 0 && <Overview spot={spot} />}
          {mode == 1 && <History />}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
}
