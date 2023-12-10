/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const Recommendation = (props) => {
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [inactivePerformersAlbums, setInactivePerformersAlbums] = useState([]);
  const [friendsHighRatingRecommendations, setFriendsHighRatingRecommendations] = useState([]);

  useEffect(() => {
    // Fetch recommended songs from the first backend endpoint
    const fetchRecommendedSongs = async () => {
      try {
        const userEmail = props.route.params.item; // Replace with the actual user email
        const response = await fetch(`http://172.25.144.1:3000/api/users/${userEmail}/recommendations`);
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
        const response = await fetch(`http://172.25.144.1:3000/api/users/${userEmail}/recommendations/inactivePerformersAlbums`);
        const data = await response.json();
        setInactivePerformersAlbums(data);
      } catch (error) {
        console.error('Error fetching recommendations for inactive performers and albums:', error);
      }
    };
    const fetchFriendsHighRatingRecommendations = async () => {
      try {
        const userEmail = props.route.params.item;
        const response = await fetch(`http://172.25.144.1:3000/api/users/${userEmail}/friendsHighRatingRecommendations`);
        const data = await response.json();
        setFriendsHighRatingRecommendations(data.recommendations);
      } catch (error) {
        console.error('Error fetching friends high rating recommendations:', error);
      }
    };

    fetchRecommendedSongs();
    fetchInactivePerformersAlbums();
    fetchFriendsHighRatingRecommendations();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Recommended Songs</Text>
      </View>
      <ScrollView style={styles.songList}>
        {recommendedSongs &&
          recommendedSongs.map(song => (
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
          ))}
        {inactivePerformersAlbums &&
          inactivePerformersAlbums.map(song => (
            <TouchableOpacity key={song._id} style={styles.songCard}>
              <View style={styles.songDetails}>
                <Text style={styles.since}>Since you have not added or listened to these songs </Text>
                <Text style={styles.songTitle}>name: {song.name}</Text>
                <Text style={styles.songArtist}>artist: {song.artist}</Text>
                <Text style={styles.songTitle}> album: {song.album}</Text>
              </View>
              <TouchableOpacity style={styles.listenButton}>
                <Text style={styles.listenButtonText}>Listen</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        {friendsHighRatingRecommendations &&
          friendsHighRatingRecommendations.map(song => (
            <TouchableOpacity key={song._id} style={styles.songCard}>
              <View style={styles.songDetails}>
                <Text>Friends</Text>
                <Text style={styles.songTitle}> name: {song.name}</Text>
                <Text style={styles.songArtist}>artist: {song.artist}</Text>
                <Text style={styles.songTitle}> album: {song.album}</Text>
                <Text style={styles.recommendedBy}>Recommended by: {song.recommendedBy}</Text>
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
    opacity: 0.25, // Adjust the opacity as needed
  },
  songList: {
    // Add styles for the song list if needed
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
  },
  songDetails: {
    flex: 1,
  },
  since: {
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
    color: '#000066'
  },
  songTitle: {
    fontSize: 14,
    color: '#333333',

  },
  songArtist: {
    fontSize: 14,
    color: '#333333',
  },
  songAlbum: {
    fontSize: 14,
    color: '#333333',
  },
  songGenre: {
    fontSize: 14,
    color: '#333333',
  },
  songReleaseDate: {
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


export default Recommendation;
