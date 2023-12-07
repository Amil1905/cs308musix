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
import { TextInput, Text, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
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
      const apiUrl = 'http://192.168.1.106:3000/api/users'; // Replace with your actual API endpoint
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
  loginrectangle: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  loginrectangle2: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    paddingHorizontal: 10,
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
  inputText: {
    margin: 5,
    fontSize: 16,
    color: 'white',
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
    fontWeight: 'bold',
  },
  register: {
    color: '#1DB954',
    fontSize: 16,
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 10,
    marginTop: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Login;
