/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AllSongsPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAllSongs = async () => {
      try {
        const response = await fetch('http://172.25.144.1:3000/api/songs');
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
      <Text style={styles.headerText}>All Songs</Text>
      <ScrollView style={styles.songList}>
        {songs.map(song => (
          <View key={song._id} style={styles.songCard}>
            <Text style={styles.songTitle}>{song.name}</Text>
            <Text style={styles.songArtist}>Artist: {song.artist}</Text>
            <Text style={styles.songAlbum}>Album: {song.album}</Text>

          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  songList: {
  },
  songCard: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  songArtist: {
    fontSize: 14,
    marginBottom: 5,
  },
  songAlbum: {
    fontSize: 14,
  },
});

export default AllSongsPage;
