/* eslint-disable prettier/prettier */
// Main.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const musicStyles = [
  { name: 'Rock', color: '#e74c3c' },        // Red
  { name: 'Pop', color: '#f39c12' },         // Orange
  { name: 'Hip Hop', color: '#3498db' },     // Blue
  { name: 'Jazz', color: '#2ecc71' },        // Green
  { name: 'Classical', color: '#9b59b6' },   // Purple
  { name: 'Electronic', color: '#e91e63' },  // Pink
  { name: 'Country', color: '#795548' },     // Brown
  { name: 'Blues', color: '#2980b9' },       // Dark Blue
  { name: 'Reggae', color: '#4caf50' },      // Green
  { name: 'Folk', color: '#8d6e63' },        // Brownish Grey
];

const musicData = [
  {
      "_id": "656f3c53d2f0326448bbb912",
      "name": "Imagine",
      "artist": [
          "John Lennon"
      ],
      "album": "Imagine",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "656f3c53d2f0326448bbb916",
      "name": "Like a Rolling Stone",
      "artist": [
          "Bob Dylan"
      ],
      "album": "Highway 61 Revisited",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "656f3cc4d2f0326448bbb925",
      "name": "aa",
      "artist": [
          "aa"
      ],
      "album": "aa",
      "releaseDate": "2001-02-01T00:00:00.000Z",
      "genre": [
          "Classical"
      ],
      "__v": 0
  },
  {
      "_id": "657042a7c11ca5afdab8dd36",
      "name": "Diamonds",
      "artist": [
          "Rihanna"
      ],
      "album": "Diamonds",
      "releaseDate": "2001-01-01T00:00:00.000Z",
      "genre": [
          "Pop"
      ],
      "__v": 0
  },
  {
      "_id": "657042d2c11ca5afdab8dd3c",
      "name": "dumtektek",
      "artist": [
          "hadise"
      ],
      "album": "dumdum",
      "releaseDate": "1990-01-01T00:00:00.000Z",
      "genre": [
          "Pop"
      ],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c80",
      "name": "Stairway to Heaven",
      "artist": [
          "Led Zeppelin"
      ],
      "album": "Led Zeppelin IV",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c84",
      "name": "Hotel California",
      "artist": [
          "Eagles"
      ],
      "album": "Hotel California",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c88",
      "name": "Sweet Child o' Mine",
      "artist": [
          "Guns N' Roses"
      ],
      "album": "Appetite for Destruction",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c8c",
      "name": "I Can't Get No Satisfaction",
      "artist": [
          "The Rolling Stones"
      ],
      "album": "Out of Our Heads",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c90",
      "name": "Yesterday",
      "artist": [
          "The Beatles"
      ],
      "album": "Help!",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c94",
      "name": "Purple Haze",
      "artist": [
          "Jimi Hendrix"
      ],
      "album": "Are You Experienced",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570776cc433756876105c98",
      "name": "Smells Like Teen Spirit",
      "artist": [
          "Nirvana"
      ],
      "album": "Nevermind",
      "genre": [],
      "__v": 0
  },
  {
      "_id": "6570a7733c7dce9fad247d40",
      "name": "deneme1",
      "artist": [
          "hey"
      ],
      "album": "Nevermind",
      "releaseDate": null,
      "genre": [
          "Classical"
      ],
      "__v": 0
  },
  {
      "_id": "6570a7993c7dce9fad247d46",
      "name": "deneme2",
      "artist": [
          "Jimi Hendrix"
      ],
      "album": "kıh",
      "releaseDate": "2004-04-04T00:00:00.000Z",
      "genre": [
          "Classical"
      ],
      "__v": 0
  },
  {
      "_id": "6570a7b53c7dce9fad247d4d",
      "name": "deneme2",
      "artist": [
          "Nirvana"
      ],
      "album": "kı",
      "releaseDate": "2004-04-04T00:00:00.000Z",
      "genre": [
          "Classical"
      ],
      "__v": 0
  }
]

const Main = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const email = props.route.params.item;

  // Filter music tracks based on the selected genre
  const filteredTracks = selectedGenre
    ? musicData.filter((track) => track.genre.includes(selectedGenre))
    : musicData;

  return (
    <View style={styles.container}>
      {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome to musiX</Text>
      </View>

      {/* Navigation (Always displayed) */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Dashboard', {item:email})}>
          <Text style={styles.navButtonText}>Dashboard</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Friends',{item:email})}>
          <Text style={styles.navButtonText}>Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Delete', {item:email})}>
          <Text style={styles.navButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('SongInput', {item:email})}>
          <Text style={styles.navButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('BatchInput', {item:email})}>
          <Text style={styles.navButtonText}>BatchInput</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => props.navigation.navigate('Unratedsongs', {item:email})}>
          <Text style={styles.navButtonText}>Unratedsongs</Text>
        </TouchableOpacity>


      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('Recommendation',{item:email})}
        >
          <Text style={styles.recoText}>Browse Recommendations</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recoButton}
          onPress={() => props.navigation.navigate('Showfriends',{item:email})}
        >
          <Text style={styles.recoText}>Showfriends</Text>
        </TouchableOpacity>


        <Text style={styles.contentTitle}>or Select Genre...</Text>
         {/* Music Style Choices */}
         <View style={styles.choices}>
          {musicStyles.map((style, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.styleButton, { backgroundColor: style.color }]}
              onPress={() => {
                console.log('Selected Genre:', style.name);
                setSelectedGenre(style.name);
              }}
            >
              <Text style={styles.styleButtonText}>{style.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Display Music Tracks */}
        {filteredTracks.map((track) => (
          <View key={track._id} style={styles.trackContainer}>
            <Text style={styles.trackName}>{track.name}</Text>
            <Text style={styles.trackArtist}>{track.artist.join(', ')}</Text>
            <Text style={styles.trackAlbum}>{track.album}</Text>
          </View>
        ))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    backgroundColor: '#1DB954',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#282828',
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
    backgroundColor: '#1DB954',
    padding: 15,
    margin: 5,
    borderRadius: 5,
  },

  recoText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
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
    alignItems: 'center',
    backgroundColor: '#282828',
    padding: 10,
  },
  bottomBarButton: {
    backgroundColor: '#1DB954',
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
    marginHorizontal: 40,
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Main;
