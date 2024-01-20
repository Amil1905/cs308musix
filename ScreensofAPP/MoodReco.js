/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const MoodReco = (props) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const userEmail = props.route.params.item;

  const handleMoodButtonClick = async (mood) => {
    try {
      const response = await fetch('http://192.168.1.110:3000/api/generatePlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood }),
      });

      const data = await response.json();

      if (response.ok) {
        setPlaylistCreated(true);
        setSelectedMood(mood);
        setPlaylistSongs(data.playlist.songs); // Update the playlistSongs state
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Failed to create playlist. Please try again.');
      }
    } catch (error) {
      console.error('Error creating playlist:', error.message);
      Alert.alert('Error', 'Failed to create playlist. Please try again.');
    }
  };

  const handleLikeButtonClick = async () => {
    if (!playlistCreated) {
      Alert.alert('Error', 'Please create a playlist first.');
      return;
    }

    try {
      const response = await fetch('http://192.168.1.110:3000/api/likePlaylist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          playlistName: `${selectedMood} Playlist`,
          songs: playlistSongs, // Include the list of songs from the state
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Failed to like playlist. Please try again.');
      }
    } catch (error) {
      console.error('Error liking playlist:', error.message);
      Alert.alert('Error', 'Failed to like playlist. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Mood:</Text>

      <TouchableOpacity
        style={[styles.moodButton, selectedMood === 'happy' && styles.selectedMood]}
        onPress={() => handleMoodButtonClick('happy')}
      >
        <Text>Happy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.moodButton, selectedMood === 'sad' && styles.selectedMood]}
        onPress={() => handleMoodButtonClick('sad')}
      >
        <Text>Sad</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.moodButton, selectedMood === 'energetic' && styles.selectedMood]}
        onPress={() => handleMoodButtonClick('energetic')}
      >
        <Text>Energetic</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.likeButton} onPress={handleLikeButtonClick}>
        <Text style={styles.buttonText}>Like Playlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  moodButton: {
    backgroundColor: '#DDDDDD',
    padding: 12,
    marginBottom: 16,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: 'lightblue',
  },
  likeButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MoodReco;
