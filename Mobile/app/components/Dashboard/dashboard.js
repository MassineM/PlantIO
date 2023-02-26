import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Button from '../../containers/Button/button';
import Menu from '../../containers/Menu/menu';
import styles from './styles';

export default function Dashboard({navigation}) {
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [plants, setPlants] = useState({});
  const user = auth().currentUser;

  const getPlants = async () => {
    firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`plantations/${user.uid}`)
      .on('value', snapshot => {
        const item = [];
        const spots = [];

        snapshot.forEach(child => {
          item.push({
            id: child.key,
            ...child.val(),
          });
          // let key = child.key;
          // let childValue = child.exportVal();
          //let item = Object.keys(childValue['.value']);
          setPlants(item);
        });
      });
    // console.log(plants[0].spots, 'plants');

    // let data = snapshot.exportVal();
    // let items = Object.keys(data['.value']);

    // setPlants(items);
  };
  const getCount = plant => {
    if (plant.spots != undefined) {
      const spot = plant.spots;
      let count = Object.keys(spot).length;
      Object.keys(spot).forEach(spotKey => {
        const currentSpot = spot[spotKey];
      });
      return count;
    } else return 0;
  };
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
      return sum / count;
    } else return 0;
  };
  const getMeanLight = plant => {
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

  const menuItem = [
    {title: 'Overview', mode: 0},
    {title: 'Details', mode: 1},
    {title: 'History', mode: 2},
  ];
  useEffect(() => {
    getPlants();
  }, []);

  const logout = () => {
    auth()
      .signOut()
      .then(() => navigation.navigate('Login'))
      .catch(error => {
        alert(error);
      });
  };

  return (
    <SafeAreaProvider style={{flex: 1, height: 'auto'}}>
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
          <View style={styles.buttons}>
            <Button
              mode={'Add'}
              text="+   New Plantation"
              do={() => navigation.navigate('Add New Plantation')}
            />
            <Button mode={'logout'} text="Log out" do={() => logout()} />
          </View>
          <View style={styles.list}>
            <FlatList
              data={plants}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={[styles.pcard]}
                  onPress={() =>
                    navigation.navigate('Plantation', {plant: item})
                  }>
                  <Text style={styles.title}>{item.name}</Text>
                  <View style={styles.info}>
                    <Text style={styles.description}>
                      Description : {item.description}
                    </Text>
                    <Text style={styles.description}>
                      Contains : {item.spots ? getCount(item) : 0}{' '}
                      {getCount(item) == 1 ? 'spot' : 'spots'}
                    </Text>
                  </View>
                  <View style={styles.meanValues}>
                    <View style={styles.description}>
                      <Text style={styles.values}>Temperature</Text>
                      <Text style={styles.values}>
                        {item.spots ? getMeanTemp(item) : 0}
                      </Text>
                    </View>
                    <View style={styles.description}>
                      <Text style={styles.values}>Humidity</Text>
                      <Text style={styles.values}>
                        {item.spots ? getMeanHum(item) : 0}
                      </Text>
                    </View>
                    <View style={styles.description}>
                      <Text style={styles.values}>Luminosity</Text>
                      <Text style={styles.values}>
                        {item.spots ? getMeanLight(item) : 0}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                // <Button
                //     text={item.name}
                //     do={() => navigation.navigate('Plantation', {plant: item})}
                //   />
              )}
            />
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
}
