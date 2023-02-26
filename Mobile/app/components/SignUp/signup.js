import React, {useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '../Login/styles';
import auth from '@react-native-firebase/auth';

export default function RegistrationScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user.updateProfile({
          displayName: fullName,
        });
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
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('../../assets/Logo.png')}
        />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor=""
            onChangeText={text => setFullName(text)}
            value={fullName}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="exemple@gmail.com"
            onChangeText={text => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="**************"
            secureTextEntry
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="**************"
            secureTextEntry
            placeholder="Confirm Password"
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}>
            <Text style={styles.buttonTitle}>Submit</Text>
          </TouchableOpacity>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already got an account?{' '}
              <Text onPress={onFooterLinkPress} style={styles.footerLink}>
                Log in
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
