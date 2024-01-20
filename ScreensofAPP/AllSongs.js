/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
const AllSongsPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const response = await fetch('http://192.168.1.110:3000/api/songs');
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchAllSongs();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      <View style={styles.header}>
        <Text style={styles.headerText}>All Songs</Text>
      </View>

      <ScrollView style={styles.songList}>
        {songs.map(song => (
          <TouchableOpacity key={song._id} style={styles.songCard}>
              <View style={styles.songDetails}>
                <Text style={styles.songTitle}>{song.name}</Text>
                <Text style={styles.songArtist}>Artist: {song.artist}</Text>
                <Text style={styles.songAlbum}>Album: {song.album}</Text>
              </View>

              <TouchableOpacity style={styles.listenButton}>
                <Text style={styles.listenButtonText}>Listen</Text>
              </TouchableOpacity>
        </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Your Musix, Your Rules.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#222222', 
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.25, 
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',
  },
  songArtist: {
    fontSize: 14,
    color: '#333333',
  },
  songAlbum: {
    fontSize: 14,
    color: '#333333',
  },
  listenButton: {
    backgroundColor: '#666666',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listenButtonText: {
    color: '#fff',
  },
  bottomBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingVertical: 0, // Adjust padding as needed
    paddingHorizontal: 20,
    marginTop: 'auto',
  },
  bottomBarText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'white',
  },
});

export default AllSongsPage;
