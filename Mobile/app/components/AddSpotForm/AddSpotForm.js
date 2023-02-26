import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Login/styles';

export default function AddSpotForm({route, navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [materielName, setMaterielName] = useState('');
  const [ref, setRef] = useState('');
  function randomRef() {
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomRef = '';
    for (var i = 0; i < 20; i++) {
      randomRef += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return randomRef;
  }
  const addSpot = async () => {
    const user = auth().currentUser;
    const spotRef = randomRef();
    const db = firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`plantations/${user.uid}/${route.params.plantId}/spots/${spotRef}`);
    db.set({
      description: description,
      name: name,
      materialName: materielName,
      materialRef: ref,
      realtimeTemp: 0,
      realtimeHumd: 0,
      realtimeLum: 0,
    })
      .then(() => {
        navigation.goBack();
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{flex: 1, width: '100%'}}
        keyboardShouldPersistTaps="always">
        {/* <Image style={styles.logo} source={assets.ailata - logo} /> */}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            placeholderTextColor="#aaaaaa"
            onChangeText={text => setName(text)}
            value={name}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Déscription"
            onChangeText={text => setDescription(text)}
            value={description}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Le nom du matériel"
            onChangeText={text => setMaterielName(text)}
            value={materielName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Référence du matériel"
            onChangeText={text => setRef(text)}
            value={ref}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.button} onPress={() => addSpot()}>
            <Text style={styles.buttonTitle}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
