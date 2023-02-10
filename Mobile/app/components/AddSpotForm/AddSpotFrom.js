import React, {useState} from 'react';
import {firebase} from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';

export default function AddSpotForm(props, {navigation}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [materielName, setMaterielName] = useState('');
  const [ref, setRef] = useState('');

  const addSpot = async () => {
    const user = auth().currentUser;
    const ref = firebase
      .app()
      .database(
        'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app/',
      )
      .ref(`Spots/${user.uid}/${props.plant}/${name}`);
    await ref
      .set({
        name: name,
        description: description,
        materielName: materielName,
        ref: ref,
      })
      .then(() => {
        navigation.navigate('Plantation');
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
      </KeyboardAwareScrollView>
    </View>
  );
}
