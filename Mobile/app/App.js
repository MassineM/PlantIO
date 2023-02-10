import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Login from './components/Login/login';
import SignUp from './components/SignUp/signup';
import Dashboard from './components/Dashboard/dashboard';
import Plantation from './components/Plantation/plantation';
import Spot from './components/Spot/spot';
import AddPlantationForm from './components/AddPlantationForm/AddPlantationForm';
//import AddSpotFrom from './components/AddSpotFrom/AddSpotFrom';

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
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="Plantation"
        component={Plantation}
        options={{headerLeft: null}}
      />
      <Stack.Screen
        name="Add New Plantation"
        component={AddPlantationForm}
        options={{headerLeft: null}}
      />
      <Stack.Screen name="Spot" component={Spot} options={{headerLeft: null}} />
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
