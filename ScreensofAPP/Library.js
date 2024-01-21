/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'; // make sure to install expo or react-native-vector-icons

const Library = (props) => {
  const email = props.route?.params?.item;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('./library.png')} style={[styles.backgroundImage,{marginTop:50} ]} />

      {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{`musiX Library`}</Text>
      </View>

       

      {/* Content */}
      <ScrollView style={ [styles.content, { marginTop: 185, marginLeft: 70 } ]}>
            <TouchableOpacity
                style={styles.recoButton}
                onPress={() => props.navigation.navigate('AllSongs', { item: email })}
            >
                <Text style={styles.recoText}>All Songs</Text>
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
                <Text style={styles.recoText}>Add Batch Input</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.recoButton}
                onPress={() => props.navigation.navigate('Delete', { item: email })}
            >
                <Text style={styles.recoText}>Delete Song</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.recoButton}
                onPress={() => props.navigation.navigate('Playlist2', { item: email })}
            >
                <Text style={styles.recoText}>View Playlists</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.recoButton}
                onPress={() => props.navigation.navigate('Playlist', { item: email })}
            >
                <Text style={styles.recoText}>Create Playlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.recoButton}
                onPress={() => props.navigation.navigate('BlendedPlaylistPage', { item: email })}
            >
                <Text style={styles.recoText}>Blended Playlists</Text>
            </TouchableOpacity>


      </ScrollView>

      {/* Bottom Bar (Always displayed) */}
      <View style={styles.bottomBar}>
  <TouchableOpacity style={styles.tabButton} 
    onPress={() => props.navigation.navigate('MainPage', { item: email })}>
    <Text style={styles.tabButtonText}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tabButton}
    onPress={() => props.navigation.navigate('Explore', { item: email })}>
    <Text style={styles.tabButtonText}>Explore</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tabButton}
    onPress={() => props.navigation.navigate('Library', { item: email })}>
    <Text style={styles.tabButtonText}>Library</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tabButton}
    onPress={() => props.navigation.navigate('ProfilePage', { item: email })}>
    <Text style={styles.tabButtonText}>Profile</Text>
  </TouchableOpacity>
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
    //opacity: 0.25, // Adjust the opacity as needed
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
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  recoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)', // Slightly visible border
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },

  buttonContainer: {
    backgroundColor: '#333333', 
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center', // Center the button horizontally
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Library;