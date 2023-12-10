/* eslint-disable prettier/prettier */
// Main.js

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Main = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const email = props.route.params.item;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to musiX</Text>
      </View>

       {/* Navigation (Always displayed) */}
       <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Dashboard', { item: email })}>
          <Text style={styles.navButtonText}>Dashboard</Text>
        </TouchableOpacity>

        

        

        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Recommendation', { item: email })}>
          <Text style={styles.navButtonText}>Recommendations</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Showfriends', { item: email })}>
          <Text style={styles.navButtonText}>My Friends</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('AllSongs', { item: email })}
        >
          <Text style={styles.recoText}>All Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('Unratedsongs', { item: email })}
        >
          <Text style={styles.recoText}>Unrated Songs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('Friends', { item: email })}
        >
          <Text style={styles.recoText}>Add Friends</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('SongInput', { item: email })}
        >
          <Text style={styles.recoText}>Add Song</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('BatchInput', { item: email })}
        >
          <Text style={styles.recoText}>Add Song with Batch Input</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('Delete', { item: email })}
        >
          <Text style={styles.recoText}>Delete Song</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('DataExport', { item: email })}
        >
          <Text style={styles.recoText}>Data Export</Text>
        </TouchableOpacity>
        
      </ScrollView>

      {/* Bottom Bar (Always displayed) */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.bottomBarButtonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.bottomBarText}>musiX</Text>
        <TouchableOpacity style={styles.bottomBarButton} onPress={() => props.navigation.navigate('Register')}>
          <Text style={styles.bottomBarButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
      < View style={styles.phrasecontainer}>
          <Text style={styles.phrase}>Your Musix, Your Rules.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.25, // Adjust the opacity as needed
  },
  header: {
    backgroundColor: '#222222',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333333',
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
  recoButton: {
    borderBottomWidth: 1, // Add a border at the bottom
    borderBottomColor: '#000', // Set the border color
    paddingVertical: 25, // Adjust padding as needed
    paddingHorizontal: 20, // Adjust padding as needed
  },
  recoText: {
    color: '#333333',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  phrasecontainer: {
    paddingVertical: 0, // Adjust padding as needed
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  phrase: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    padding: 10,
  },
  bottomBarButton: {
    backgroundColor: '#D1D1D1',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },
  bottomBarButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomBarText: {
    color: 'white',
    marginHorizontal: 40,
    fontSize: 28,
    fontWeight: 'bold',
  },
  dropdownButton: {
    backgroundColor: '#282828',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  dropdownButtonText: {
    color: '#1DB954',
  },
});

export default Main;
