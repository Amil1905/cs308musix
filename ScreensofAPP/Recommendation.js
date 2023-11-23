/* eslint-disable prettier/prettier */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';


const Recommendation = () => {

  const recommendedSongs = [
    // TO SHOW AN EXAMPLE
    {
      id: 1,
      title: 'Song Title 1',
      artist: 'Artist 1',
      imageUrl: 'https://example.com/song1.jpg',
    },
    {
      id: 2,
      title: 'Song Title 2',
      artist: 'Artist 2',
      imageUrl: 'https://example.com/song2.jpg',
    },

  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommended Songs</Text>
      </View>

      <ScrollView style={styles.songList}>
        <Text></Text>
        {recommendedSongs.map((song) => (
          <TouchableOpacity key={song.id} style={styles.songCard}>
            <Image source={{ uri: song.imageUrl }} style={styles.songImage} />
            <View style={styles.songDetails}>
              <Text style={styles.songTitle}>{song.title}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
            </View>
            <TouchableOpacity style={styles.listenButton}>
              <Text style={styles.listenButtonText}>Listen</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  songList: {
    // Add styles for the song list if needed
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  songArtist: {
    fontSize: 14,
    color: '#fff',
  },
  listenButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listenButtonText: {
    color: '#fff',
  },
});

export default Recommendation;
