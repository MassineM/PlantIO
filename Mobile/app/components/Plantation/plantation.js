import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SpotList from './Spots/spots';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Menu from '../../containers/Menu/menu';
import Details from './Details/details';
import Button from '../../containers/Button/button';
import Overview from './Overview/overview';
import styles from './styles';

export default function Plantation({route, navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [plant, setPlant] = useState({});
  const [addSpot, setAddSpot] = useState(false);
  const [mode, setMode] = useState(0);

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
          <Text style={styles.title}>{plant.name}</Text>
          <Menu mode={false} setMode={m => setMode(m)} />
          {mode == 0 && <Overview plant={plant} />}
          {mode == 1 &&
            ((<Button text="Ajouter un spot" do={() => setAddSpot(true)} />),
            (<SpotList plant={plant} />))}
          {mode == 2 && <Details plant={plant} />}
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
}
