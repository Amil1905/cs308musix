/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image
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

      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      <View style={styles.rectangle}>
        <Text style={styles.textmusix}>Register to musiX</Text>
      </View>

      
      <Text style={styles.email}>Email</Text>
      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={Email => setEmail(Email)}
          style={styles.input}
        />
      </View>
      <Text style={styles.sifre}>Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          secureTextEntry={true}
          onChangeText={Pass => setPass(Pass)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity
        style={styles.loginbut}
        onPress={() => {
          Signer();
        }}
      >
        <Text style={styles.giris}>Register</Text>
      </TouchableOpacity>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Your Musix, Your Rules.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    backgroundColor: '#222222',
    padding: 20,
    alignItems: 'center',
    marginBottom: 100,
    width: '100%',
  },
  textmusix: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.25, // Adjust the opacity as needed
  },
  inputContainer: {
    width: '80%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#333333',
    marginBottom: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  email: {
    color: '#333333',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sifre: {
    color: '#333333',
    marginLeft: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputText: {
    margin: 5,
    fontSize: 16,
    color: '#333333',
  },
  loginbut: {
    width: '80%',
    height: 50,
    backgroundColor: '#333333',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  giris: {
    color: 'white',
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  register: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 0, // Adjust padding as needed
    paddingHorizontal: 20,
    marginTop: 'auto',
  },
  bottomBarText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
  },
});

export default Register;