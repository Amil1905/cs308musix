/* eslint-disable react/self-closing-comp */
/* eslint-disable keyword-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
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

function SongInput () {
    return(
        <View style={styles.Ekrans}>
            <View style={styles.Ekran}>
                <Text style={styles.musixx}>
                    musiX
                </Text>
                <Text style={styles.texts}>
                    Song
                </Text>
                <View style={styles.rectangle}>
                    <TextInput
                    />

                </View>
                <Text style={styles.texts}>
                    Artist
                </Text>
                <View style={styles.rectangle}>
                    <TextInput
                    />

                </View>
                <Text style={styles.texts}>
                    Album
                </Text>
                <View style={styles.rectangle}>
                    <TextInput
                    />

                </View>
                <TouchableOpacity style={styles.buton}>
                    <Text style={styles.butontext}>
                        Ekle
                    </Text>
                </TouchableOpacity>
                
            </View>
            
        </View>
    )
    
}


const styles=StyleSheet.create( {
    rectangle:{
        width:300,
        height:50,
        borderWidth:5,
        borderRadius:10,
        marginBottom:50,
        backgroundColor:"white",
        borderColor:"#B0BF1A"
    
    },
    musixx:{
        fontSize:50,
        color:"green"

    },
    Ekran:{
        alignItems:"center",
        justifyContent:"center",
        
    },
    Ekrans:{
        justifyContent:"center",
        flex:1,
        backgroundColor:"#343434"
    },
    texts:{
        marginLeft:-250,
        width:70,
        height:30,
        fontSize:17,
        color:"#16F529"
  
        
    },
    buton:{
        width:50,
        height:25,
        borderRadius:5,
        borderWidth:3,
        borderColor:"#FFD700",
        backgroundColor:"black",
        alignItems:'center'
    },
    butontext:{
        color:"#FFD700"
    }

  
  })


export default SongInput;