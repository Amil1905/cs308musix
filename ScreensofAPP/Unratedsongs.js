/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';

const Unratedsongs = (props) => {
  const [unratedSongs, setUnratedSongs] = useState([]);
  const [ratings, setRatings] = useState({});

  const fetchUnratedSongs = async () => {
    try {
      const userEmail = props.route.params.item;
      const response = await fetch(`http://172.25.144.1:3000/users/${userEmail}/unratedSongs`);
      const data = await response.json();
      setUnratedSongs(data);
      const initialRatings = {};
      data.forEach((song) => {
        initialRatings[song._id] = '';
      });
      setRatings(initialRatings);
    } catch (error) {
      console.error('Error fetching unrated songs:', error);
    }
  };

  useEffect(() => {
    fetchUnratedSongs();
  }, []);

  const updateRating = async (songId) => {
    try {
      const userEmail = props.route.params.item;
      const response = await fetch(`http://172.25.144.1:3000/user/${userEmail}/song/${songId}/rate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newRating: parseInt(ratings[songId]),
        }),
      });

      if (response.ok) {
        // Call the function here instead of using fetchUnratedSongs()
        fetchUnratedSongs();
        setRatings((prevRatings) => ({
          ...prevRatings,
          [songId]: '',
        }));
      } else {
        console.error('Error updating rating:', response.status);
      }
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Unrated Songs</Text>
      </View>

      <ScrollView style={styles.songList}>
        {unratedSongs.map((song) => (
          <View key={song._id} style={styles.songCard}>
            <Image source={{ uri: song.imageURL }} style={styles.songImage} />
            <View style={styles.songDetails}>
              <Text style={styles.songTitle}>{song.name}</Text>
              <Text style={styles.songArtist}>{song.artist}</Text>
              <Text style={styles.songAlbum}>{song.album}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <TextInput
                style={styles.ratingInput}
                placeholder="Enter rating (0-5)"
                keyboardType="numeric"
                value={ratings[song._id]}
                onChangeText={(text) =>
                  setRatings((prevRatings) => ({
                    ...prevRatings,
                    [song._id]: text,
                  }))
                }
              />
              <Button title="Rate" onPress={() => updateRating(song._id)} />
            </View>
          </View>
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
  songAlbum: {
    fontSize: 12,
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ratingInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 80,
    marginBottom: 8,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Unratedsongs;
