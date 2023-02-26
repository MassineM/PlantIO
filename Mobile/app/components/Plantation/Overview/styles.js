import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  gaugeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  gaugeTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
});
