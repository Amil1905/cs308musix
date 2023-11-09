/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
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

function Login(props,{navigation}) {
  function navigaetosignup() {
   props.navigation.navigate('Register')
  }
  function navigaetoinput() {
    props.navigation.navigate('SongInput')
   }
   function navigaetoMain() {
    props.navigation.navigate('MainPage')
   }
  return (
    <View>
      <View style={styles.border1}>
        <View style={styles.rectangle}>
          <Text style={styles.textmusix}>
            Musix
          </Text>
          <Text style={styles.logintext}>
          Giriş Yap
        </Text>
        </View>
        <Text style={styles.email}>
          Email
        </Text>
        <View style={styles.loginrectangle}>
          <TextInput

          />

        </View>
        <Text style={styles.sifre}>
          Şifre
        </Text>
        <View style={styles.loginrectangle2}>
          <TextInput 
          secureTextEntry={true}
      
            
          />

        </View>
        <TouchableOpacity style={styles.loginbut}>
          <View >
            <Text style={styles.giris}>
              Giriş Yap
            </Text>
          </View>
    
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
          navigaetosignup();
              }}>
          <Text style={styles.register}>
            Hesap Oluştur
          </Text>
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => {
          navigaetoinput();
              }}>
          <Text style={styles.register}>
            input
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
          navigaetoMain();
              }}>
          <Text style={styles.register}>
            MainPage
          </Text>
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

export default Login;
