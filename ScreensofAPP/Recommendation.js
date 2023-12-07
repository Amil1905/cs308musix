/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const Recommendation = (props) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [inactivePerformersAlbums, setInactivePerformersAlbums] = useState([]);

  useEffect(() => {
    // Fetch recommended songs from the first backend endpoint
    const fetchRecommendedSongs = async () => {
      try {
        const userEmail = props.route.params.item; // Replace with the actual user email
        const response = await fetch(`http://192.168.1.106:3000/api/users/${userEmail}/recommendations`);
        const data = await response.json();
        setRecommendedSongs(data);
      } catch (error) {
        console.error('Error fetching recommended songs:', error);
      }
    };

    // Fetch recommendations for inactive performers and albums from the second backend endpoint
    const fetchInactivePerformersAlbums = async () => {
      try {
        const userEmail = props.route.params.item; // Replace with the actual user email
        const response = await fetch(`http://192.168.1.106:3000/api/users/${userEmail}/recommendations/inactivePerformersAlbums`);
        const data = await response.json();
        setInactivePerformersAlbums(data);
      } catch (error) {
        console.error('Error fetching recommendations for inactive performers and albums:', error);
      }
    };

    fetchRecommendedSongs();
    fetchInactivePerformersAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommended Songs</Text>
      </View>

      <ScrollView style={styles.songList}>
      {recommendedSongs &&
          Array.from(new Set(recommendedSongs.map(song => song._id))).map(songId => {
            const song = recommendedSongs.find(s => s._id === songId);
            return (
          <TouchableOpacity key={song._id} style={styles.songCard}>
            <View style={styles.songDetails}>
              <Text style={styles.songTitle}> name: {song.name}</Text>
              <Text style={styles.songArtist}>artist: {song.artist}</Text>
              <Text style={styles.songTitle}> album: {song.album}</Text>
            </View>
            <TouchableOpacity style={styles.listenButton}>
              <Text style={styles.listenButtonText}>Listen</Text>
            </TouchableOpacity>
          </TouchableOpacity>
            );
            })}
        {inactivePerformersAlbums &&
          Array.from(new Set(inactivePerformersAlbums.map(song => song._id))).map(songId => {
            const song = inactivePerformersAlbums.find(s => s._id === songId);
            return (
          <TouchableOpacity key={song._id} style={styles.songCard}>
            <View style={styles.songDetails}>
              <Text>
                Since u have not added or listen these songs
              <Text style={styles.songTitle}>name:{song.name}</Text>
              <Text style={styles.songArtist}>artist: {song.artist}</Text>
              <Text style={styles.songTitle}> album :{song.album}</Text>

              </Text>
            </View>
            <TouchableOpacity style={styles.listenButton}>
              <Text style={styles.listenButtonText}>Listen</Text>
            </TouchableOpacity>
          </TouchableOpacity>
            );
            })} 
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
