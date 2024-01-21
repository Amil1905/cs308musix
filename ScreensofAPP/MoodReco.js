/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';

const MoodReco = (props) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [playlistCreated, setPlaylistCreated] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const userEmail = props.route.params.item;

  const handleMoodButtonClick = async (mood) => {
    try {
      const response = await fetch('http://192.168.1.102:3000/api/generatePlaylist', {
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
      const response = await fetch('http://192.168.1.102:3000/api/likePlaylist', {
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
    {/* Background Image */}
    <Image source={require('./hp.jpg')} style={[styles.backgroundImage, ]} />

    {/* Header (Always displayed) */}
    <View style={styles.header}>
      <Text style={styles.headerText}>{`Mood Advisor`}</Text>
    </View>
    <Text style={styles.sectionTitle}>Select Mood:</Text>


      <TouchableOpacity
        style={[styles.moodButton, selectedMood === 'happy' && styles.selectedMood]}
        onPress={() => handleMoodButtonClick('happy')}
      >
        <Text>Happy 😃</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.moodButton, selectedMood === 'sad' && styles.selectedMood]}
        onPress={() => handleMoodButtonClick('sad')}
      >
        <Text>Sad 😢</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.moodButton, selectedMood === 'energetic' && styles.selectedMood]}
        onPress={() => handleMoodButtonClick('energetic')}
      >
        <Text>Energetic 🚀</Text>
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
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.75,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#222222',
    padding: 16,
    width: '100%',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  moodButton: {
    backgroundColor: '#DDDDDD',
    padding: 12,
    marginBottom: 16,
    borderRadius: 5,
    width: 400,
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: 'lightblue',
  },
  likeButton: {
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  sectionTitle:{
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

export default MoodReco;
