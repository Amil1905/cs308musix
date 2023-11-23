/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable semi */
/* eslint-disable func-call-spacing */
/* eslint-disable keyword-spacing */
/* eslint-disable curly */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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
import auth from '@react-native-firebase/auth';

function Login(props,{navigation}) {

  const [Email, setEmail]=useState("")
  const [Pass, setPass]=useState("")
  const [errortxt, setErortxt]=useState("")
  const [Pagepasser, setPagepasser]=useState(false)



 

  const handlLogin =() => {
    setErortxt("");
    if(!Email){
      alert("Please fill Email")
      return;
    }
    if(!Pass){
      alert("Please fill Password")
      return;
    }
    auth()
    .signInWithEmailAndPassword(Email,Pass)
    .then ((user) => {
      //console.log(user);
      if(user) {
        //setSignedIn(true)   
        setPagepasser(true)
        props.navigation.navigate('MainPage',{item:Email});
        //console.log(stringValues)  

        //navigator()
        


      }
      else {
        setPagepasser(false)
        //setSignedIn(false)

      }
    })
    .catch((error) => {
      console.log(error);
      if(error.code=="auth/invalid-email")
        setErortxt(error.message);
      else if (error.code === "auth/user-not-found")
        setErortxt("No User Found");
      else {
        setErortxt("Please check your email id or password");
      }  
    });
   
  };
  function navigaetosignup() {
   props.navigation.navigate('Register')
  }
  function navigaetoinput() {
    props.navigation.navigate('SongInput')
   }
   function navigaetoMain() {
    props.navigation.navigate('MainPage')
   }
   function navigaetoBatch() {
    props.navigation.navigate('BatchInput')
   }
   function navigaetoApi() {
    props.navigation.navigate('Api')
   }
   function navigaetoReco() {
    props.navigation.navigate('Recommendation')
   }
   function navigaetoDash() {
    props.navigation.navigate('Dashboard')
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
          <TextInput           onChangeText={(Email) =>
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
        <TouchableOpacity style={styles.loginbut}   onPress={() => {
        handlLogin(Email);
          }}>
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
        <TouchableOpacity   onPress={() => {
          navigaetoBatch();
              }}>
          <Text style={styles.register}>
            Batch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
          navigaetoApi();
              }}>
          <Text style={styles.register}>
            Api
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
          navigaetoReco();
              }}>
          <Text style={styles.register}>
            Reco
          </Text>
        </TouchableOpacity>
        <TouchableOpacity   onPress={() => {
          navigaetoDash();
              }}>
          <Text style={styles.register}>
            Dash
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
