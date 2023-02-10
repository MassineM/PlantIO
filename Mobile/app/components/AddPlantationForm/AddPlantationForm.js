import React, {useState} from 'react';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function AddForm({navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [recommandTemp, setRecommandTemp] = useState('');
  const [recommandHumd, setRecommandHumd] = useState('');
  const [recommandLum, setRecommandLum] = useState('');

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
  const addPlantation = () => {
    const user = auth().currentUser;
    const plantRef = randomRef();
    const ref = firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`plantations/${user.uid}/${plantRef}`);
    ref
      .set({
        plantRef: plantRef,
        name: name,
        description: description,
        recommandTemp: recommandTemp,
        recommandHumd: recommandHumd,
        recommandLum: recommandLum,
      })
      .then(() => {
        navigation.navigate('Dashboard');
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
          placeholder="Description"
          onChangeText={text => setDescription(text)}
          value={description}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Le niveau de température recommandé"
          onChangeText={text => setRecommandTemp(text)}
          value={recommandTemp}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Le taux d'humidité recommandé"
          onChangeText={text => setRecommandHumd(text)}
          value={recommandHumd}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          placeholder="Le niveau de luminosité recommandé"
          onChangeText={text => setRecommandLum(text)}
          value={recommandLum}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={() => addPlantation()}>
          <Text style={styles.buttonTitle}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
}
