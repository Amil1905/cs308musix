/* eslint-disable prettier/prettier */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const PlaylistCreationPage = (props) => {
  const [allSongs, setAllSongs] = useState([]);
  const [selectedSongIds, setSelectedSongIds] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const userEmail = props.route.params.item;
  useEffect(() => {
    // Fetch all songs when the component mounts
    console.log('User Email (Component Mount):', userEmail);
    fetchAllSongs();
  }, []);

  const fetchAllSongs = async () => {
    // Fetch all songs from your API
    try {
      const response = await fetch('http://192.168.1.110:3000/api/songs');
      
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error fetching songs:', errorMessage);
        return;
      }

      const songsData = await response.json();
      setAllSongs(songsData);

    } catch (error) {
      console.error('Error fetching songs:', error.message);
    }
  };

  const handleSongSelection = useCallback((songId) => {
    console.log('Selected Song IDs:', selectedSongIds);
    setSelectedSongIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(songId)) {
        return prevSelectedIds.filter((id) => id !== songId);
      } else {
        return [...prevSelectedIds, songId];
      }
    });
  }, [selectedSongIds]);

  const handleCreatePlaylist = async () => {
    // Implement the logic to create a playlist using the selectedSongIds and playlistName
    console.log('Entering handleCreatePlaylist');

    try {
      // Validate inputs
      if (!playlistName.trim()) {
        Alert.alert('Error', 'Please enter a valid playlist name.');
        return;
      }

      if (selectedSongIds.length === 0) {
        Alert.alert('Error', 'Please select at least one song to create the playlist.');
        return;
      }

      // Make the API request
      const response = await fetch(`http://192.168.1.110:3000/users/${userEmail}/playlists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: playlistName.trim(), songs: selectedSongIds }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        Alert.alert('Error', errorMessage);
        return;
      }

      const playlistData = await response.json();
      console.log('Playlist created successfully:', playlistData);

      // Optionally, navigate to another screen or update the UI
      // Example: props.navigation.navigate('PlaylistDetails', { playlistId: playlistData._id });

    } catch (error) {
      console.error('Error creating playlist:', error.message);
      Alert.alert('Error', 'An unexpected error occurred while creating the playlist.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Playlist</Text>

      <TextInput
        style={styles.input}
        placeholder="Playlist Name"
        value={playlistName}
        onChangeText={text => setPlaylistName(text)}
      />

<FlatList
  data={allSongs}
  keyExtractor={(item) => item._id.toString()} // Convert to string if needed
  renderItem={({ item }) => (
    <TouchableOpacity
      style={[styles.songContainer, selectedSongIds.includes(item._id) && styles.selectedSong]}
      onPress={() => {
        console.log('Song pressed:', item._id);
        handleSongSelection(item._id);
      }}
    >
      <Text>{item.name} - {item.artist}</Text>
    </TouchableOpacity>
  )}
/>

      <TouchableOpacity style={styles.button} onPress={handleCreatePlaylist}>
        <Text style={styles.buttonText}>Create Playlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 10,
  },
  songContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  selectedSong: {
    backgroundColor: 'lightblue',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
  },
});

export default PlaylistCreationPage;
