/* eslint-disable no-unused-vars */
/* eslint-disable keyword-spacing */
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

function Api(props) {
    const [data, setData]=useState([]);



    const Getsongs = async () => {
      try {
        const url = 'http://192.168.1.109:3000/api/songs';
        const response = await fetch(url);
        const json = await response.json();
        console.log('API Response:', json); // Log the response for debugging
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
     
      useEffect(()=> {
        Getsongs();
    
      }, []);
      return (
        <View>
          {data.map((song) => (
            <View key={song._id}>
              <Text>{`Name: ${song.name}`}</Text>
              <Text>{`Artist: ${song.artist.join(', ')}`}</Text>
              <Text>{`Album: ${song.album || 'N/A'}`}</Text>
              <Text>{`Rating: ${song.rating || 'N/A'}`}</Text>
            </View>
          ))}
        </View>
      );

}



export default Api;

