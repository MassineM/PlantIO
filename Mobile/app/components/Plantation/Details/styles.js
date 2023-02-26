import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    margin: 20,
    padding: 10,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: '#f7fbf3c9',
    borderRadius: 15,
    borderColor: '#4b5b4b71',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginLeft: 10,
    width: '90%',
  },
  title: {
    color: '#2c2c2c',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  values: {
    color: '#2c2c2c',
    fontSize: 14,
  },
});
