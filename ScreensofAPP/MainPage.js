/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const musicStyles = [
  { name: 'Pop', color: '#1DB954' },
  { name: 'Rock', color: '#D32F2F' },
  { name: 'Hip Hop', color: '#1ED760' },
  { name: 'Jazz', color: '#FF5722' },
  { name: 'Electronic', color: '#607D8B' },
  { name: 'R&B', color: '#FFC107' },
  { name: 'Country', color: '#795548' },
  { name: 'Classical', color: '#9C27B0' },
  { name: 'Reggae', color: '#4CAF50' },
  { name: 'Metal', color: '#607D8B' },
  { name: 'Funk', color: '#E91E63' },
  { name: 'Blues', color: '#03A9F4' },
  { name: 'Soul', color: '#FF9800' },
  { name: 'Indie', color: '#795548' },
  { name: 'Latin', color: '#4CAF50' },
  { name: 'Punk', color: '#9C27B0' },
];

const Main = (props) => {
  function navigaetosignup() {
    props.navigation.navigate('Register')
   }
   function navigaetoLogin() {
    props.navigation.navigate('Login')
   }
   function navigaetoApi() {
    props.navigation.navigate('Api')
   }
 



    return (
      <View style={styles.container}>
        {/* Header (Always displayed) */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome to musiX</Text>
        </View>
  
        {/* Navigation (Always displayed) */}
        <View style={styles.navigation}>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Text style={styles.navButtonText}>Your Library</Text>
          </TouchableOpacity>
        </View>
  
        {/* Content */}
        <ScrollView style={styles.content}>
          <Text style={styles.contentTitle}>Browse musiX</Text>
  
          {/* Music Style Choices */}
          <View style={styles.choices}>
            {musicStyles.map((style, index) => (
              <TouchableOpacity key={index}  style={[styles.styleButton, { backgroundColor: style.color }]}  onPress={() => {
                navigaetoApi();
                    }} >
                  
                <Text style={styles.styleButtonText}>{style.name}</Text>
              </TouchableOpacity>
             
            ))}
          </View>
          
        </ScrollView>
        
  
        {/* Bottom Bar (Always displayed) */}
        <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton}  onPress={() => {
          navigaetoLogin();
              }}>
            <Text style={styles.bottomBarButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.bottomBarText}>musiX</Text>
        <TouchableOpacity style={styles.bottomBarButton}
         onPress={() => {
          navigaetosignup();
              }}>
            <Text style={styles.bottomBarButtonText}>Register</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#343434',
    },
    header: {
      backgroundColor: 'green',
      padding: 20,
      alignItems: 'center',
    },
    headerText: {
      color: 'white',
      fontSize: 24,
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: 'black',
      padding: 10,
    },
    navButton: {
      padding: 10,
    },
    navButtonText: {
      color: 'white',
    },
    content: {
      flex: 1,
    },
    contentTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
      fontStyle: 'italic',
      color:'white',
    },
    choices: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      margin: 20,
    },
    styleButton: {
      padding: 20,
      borderRadius: 5,
      margin: 5,
      width: '45%',
      alignItems: 'center',
    },
    styleButtonText: {
      color: 'white',
      fontSize: 18,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', // Center the buttons vertically
        backgroundColor: 'black',
        padding: 10,
      },
      bottomBarButton: {
        backgroundColor: 'green',
        padding: 15,
        margin: 5,
        borderRadius: 5,
      },
      bottomBarButtonText: {
        color: 'white',
        fontSize: 16,
      },
      bottomBarText: {
        color: 'white',
        marginHorizontal: 40, // Add margin between "musiX" and buttons
        fontSize: 28,
        fontWeight: 'bold',
      },
  });
  
  export default Main;