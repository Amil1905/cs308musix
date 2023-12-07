/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

function Register(props) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  function Signer() {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(() => {
        console.log('User account created & signed in!');
        props.navigation.navigate('Login', { item: email });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Text style={styles.textmusix}>Register to musiX</Text>
      </View>
      <Text></Text>
      <Text style={styles.email}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={Email => setEmail(Email)}
          style={styles.input}
        />
      </View>
      <Text></Text>
      <Text style={styles.sifre}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={true}
          onChangeText={Pass => setPass(Pass)}
          style={styles.input}
        />
      </View>
      <Text></Text>
      <Text></Text>
      <TouchableOpacity
        style={styles.loginbut}
        onPress={() => {
          Signer();
        }}
      >
        <Text style={styles.giris}>Register</Text>
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>musiX</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    backgroundColor: '#1DB954',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  textmusix: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  logintext: {
    color: 'white',
    fontSize: 30,
    marginTop: 10,
  },
  inputContainer: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    color: 'white',
  },
  email: {
    color: 'white',
    marginLeft: 10,
    marginBottom: 5,
  },
  sifre: {
    color: 'white',
    marginLeft: 10,
    marginBottom: 5,
  },
  loginbut: {
    width: '80%',
    height: 50,
    backgroundColor: '#1DB954',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  giris: {
    color: 'white',
    margin: 10,
    fontSize: 16,
    fontWeight:'bold',
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 10,
    marginTop: 'auto',
  },
  bottomBarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Register;