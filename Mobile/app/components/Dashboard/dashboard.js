import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import Button from '../../containers/Button/button';
import Menu from '../../containers/Menu/menu';

export default function Dashboard({navigation}) {
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

    // let data = snapshot.exportVal();
    // let items = Object.keys(data['.value']);

    // setPlants(items);
  };

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
    <View>
      <Text>Welcome {user.displayName} !</Text>
      <FlatList
        data={plants}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View>
            <Button
              text={item.name}
              do={() => navigation.navigate('Plantation', {plant: item})}
            />
          </View>
        )}
      />
      <Button text="Log Out" do={() => logout()} />
      {/* <Text>{plants}</Text> */}
      <Button
        text="Add New Plantation"
        do={() => navigation.navigate('Add New Plantation')}
      />
      <Menu />
    </View>
  );
}
