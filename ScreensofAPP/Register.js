/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
function Register(props) {
  const [Email, setEmail]=useState("")
    const [Pass, setPass]=useState("")

    function Signer() {
        auth()
          .createUserWithEmailAndPassword(Email, Pass)
          .then(() => {
            console.log('User account created & signed in!');

            // Navigate to the WelcomePage after successful signup
            props.navigation.navigate('MainPage', { item: Email });
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
    <View>
      <View style={styles.border1}>
        <View style={styles.rectangle}>
          <Text style={styles.textmusix}>
            Musix
          </Text>
          <Text style={styles.logintext}>
          Hesap Oluştur
        </Text>
        </View>
        <Text style={styles.email}>
          Email
        </Text>
        <View style={styles.loginrectangle}>
          <TextInput 
                        onChangeText={(Email) =>
                          setEmail(Email)
                        }

          />

        </View>
        <Text style={styles.sifre}>
          Şifre
        </Text>
        <View style={styles.loginrectangle2}>
          <TextInput 
          secureTextEntry={true}
          onChangeText={(Pass) =>
            setPass(Pass)
          }
      
            
          />

        </View>
        <TouchableOpacity style={styles.loginbut}       onPress={() => {
        Signer();
      }}>
          <View >
            <Text style={styles.giris}>
              Hesap oluştur
            </Text>
          </View>
    
        </TouchableOpacity>


      </View>      
    </View>

  );

}


const styles=StyleSheet.create( {
  border1:{
    width:350,
    height:450,
    borderRadius:7,
    borderWidth:5,
    borderColor:"grey",
    justifyContent:"center",
    marginLeft:20,
    marginTop:150,
    alignItems:"center"
  },
  rectangle:{
    color:"grey",
    borderWidth:1,
    width:150,
    height:50,
    alignItems:"center",
    backgroundColor:"grey",
    marginBottom:80

  },
  textmusix:{
    color:"white",
    fontSize:40
  },
  logintext:{
    fontSize:30,
    marginTop:10


  },
  loginrectangle:{
    width:300,
    height:50,
    borderWidth:5,
    marginBottom:10,
    borderRadius:10,
    borderColor:"grey"


  },
  loginrectangle2:{
    width:300,
    height:50,
    borderWidth:5,
    borderRadius:10,
    borderColor:"grey"

  },
  email:{
    color:"black",
    marginRight:280,
    margin:5
  },
  sifre:{
    color:"black",
    marginRight:280,
    margin:5,
  },
  loginbut:{
    width:300,
    height:50,
    backgroundColor:"blue",
    alignItems:"center",
    margin:10,
    borderRadius:10,
  },
  giris:{
    color:"white",
    margin:10
  },
  register:{
    color:"red"
  }


})

export default Register;
