import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  title: {},
  logo: {
    flex: 1,
    height: 120,
    alignSelf: 'center',
    margin: 50,
  },
  input: {
    height: 45,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 15,
    width: '80%',
  },
  button: {
    backgroundColor: '#95B671',
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    borderRadius: 15,
    borderColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 25,
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d',
  },
  footerLink: {
    color: '#212121',
    fontWeight: 'bold',
    fontSize: 16,
  },
  form: {
    paddingTop: 20,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97c49745',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 30,
  },
});
