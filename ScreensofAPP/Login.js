/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable semi */
/* eslint-disable func-call-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable curly */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, StyleSheet, View, Alert, Image } from 'react-native';
import auth from '@react-native-firebase/auth';

function Login({ navigation }) {
  const [Email, setEmail] = useState('');
  const [Pass, setPass] = useState('');
  const [errortxt, setErortxt] = useState('');
  const [Pagepasser, setPagepasser] = useState(false);

  const handlLogin = () => {
    setErortxt('');
    if (!Email) {
      Alert.alert('Please fill Email');
      return;
    }
    if (!Pass) {
      Alert.alert('Please fill Password');
      return;
    }

    auth()
      .signInWithEmailAndPassword(Email, Pass)
      .then((user) => {
        if (user) {
          setPagepasser(true);
          sendEmailToApi(Email);
          navigation.navigate('MainPage', { item: Email });
        } else {
          setPagepasser(false);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/invalid-email') setErortxt(error.message);
        else if (error.code === 'auth/user-not-found') setErortxt('No User Found');
        else {
          setErortxt('Please check your email id or password');
        }
      });
  };

  function navigaetosignup() {
    navigation.navigate('Register');
  }

  const sendEmailToApi = async (email) => {
    try {
      const apiUrl = 'http://192.168.1.102:3000/api/users'; // Replace with your actual API endpoint
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("HTTP error! Status: ${response.status}");
      }

      const responseData = await response.json();
      console.log('API Response:', responseData);

      // Handle the API response as needed
    } catch (error) {
      console.error('Error sending email to API:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />
      <View style={styles.rectangle}>
        <Text style={styles.textmusix}>Login to musiX</Text>
      </View>

      <Text style={styles.email}>Email</Text>
      <View style={styles.loginrectangle}>
        <TextInput
          onChangeText={(Email) => setEmail(Email)}
          style={styles.inputText}
        />
      </View>

      <Text style={styles.sifre}>Password</Text>
      <View style={styles.loginrectangle2}>
        <TextInput
          secureTextEntry={true}
          onChangeText={(Pass) => setPass(Pass)}
          style={styles.inputText}
        />
      </View>

      <TouchableOpacity
        style={styles.loginbut}
        onPress={() => {
          handlLogin(Email);
        }}
      >
        <Text style={styles.giris}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigaetosignup()}>
        <Text style={styles.register}>Register</Text>
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
  loginrectangle: {
    width: '80%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#333333',
    marginBottom: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  loginrectangle2: {
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

export default Login;
