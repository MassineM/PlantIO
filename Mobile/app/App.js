import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from './components/Login/login';
import SignUp from './components/SignUp/signup';
import Dashboard from './components/Dashboard/dashboard';
import Plantation from './components/Plantation/plantation';
import Spot from './components/Spot/spot';
import AddPlantationForm from './components/AddPlantationForm/AddPlantationForm';
import AddSpotFrom from './components/AddSpotForm/AddSpotForm';

import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

// Bottom Navigation Bar
// const BottomDrawerNav = () => {
//   const Tab = createMaterialBottomTabNavigator();
//   return (
//     <Tab.Navigator activeColor={'#308FDB'} inactiveColor={'#59D0F0'} barStyle={{ backgroundColor: '#fff' }}>
//       <Tab.Screen
//         name="Acceuil"
//         component={Dashboard}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={images.acceuil} style={{ width: 26, height: 26 }} tintColor={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Rapports"
//         component={Reports}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={images.rapports} style={{ width: 26, height: 26 }} tintColor={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={images.notifications} style={{ width: 26, height: 26 }} tintColor={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Paramètres"
//         component={Settings}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <Image source={images.parametres} style={{ width: 26, height: 26 }} tintColor={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#00000000',
        },
        headerTintColor: '#345F06',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackground: () => (
          <Image
            style={{
              resizeMode: 'stretch',
              width: '100%',
              height: '100%',
              opacity: 0.4,
            }}
            source={require('./assets/background-1.png')}
          />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Image
              source={require('./assets/NavLogo.png')}
              style={{
                resizeMode: 'center',
                width: 40,
                height: 30,
                marginRight: 10,
              }}
            />
          </TouchableOpacity>
        ),
      })}>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerTitleAlign: 'center', headerLeft: () => <View></View>}}
      />
      <Stack.Screen name="Plantation" component={Plantation} />
      <Stack.Screen name="Add New Plantation" component={AddPlantationForm} />
      <Stack.Screen name="Add New Spot" component={AddSpotFrom} />
      <Stack.Screen name="Spot" component={Spot} />
    </Stack.Navigator>
  );
}
export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
