import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCEgObGXsWE22IHwxGRMPCGUsZ0eLCz9cg',
  authDomain: 'plantio24.firebaseapp.com',
  databaseURL:
    'https://plantio24-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'plantio24',
  storageBucket: 'plantio24.appspot.com',
  messagingSenderId: '1063802493233',
  appId: '1:1063802493233:web:ccdd1d31e7b0d6f4d03810',
  measurementId: 'G-T4WH0VE7RM',
};
firebase.initializeApp(firebaseConfig);
export default firebase;
