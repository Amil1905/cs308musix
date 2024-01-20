/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PlaylistCreationPage2 = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    // Fetch user playlists when the component mounts
    fetchUserPlaylists();
  }, []);

  const fetchUserPlaylists = async () => {
    const userEmail = props.route.params.item;

    try {
      const response = await fetch(`http://192.168.1.110:3000/api/users/${userEmail}/playlists`);
      
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error fetching playlists:', errorMessage);
        return;
      }

      const playlistsData = await response.json();
      setUserPlaylists(playlistsData);

    } catch (error) {
      console.error('Error fetching playlists:', error.message);
    }
  };

  const handleRemoveSong = async (playlistName, songId) => {
    const userEmail = props.route.params.item;
  
    try {
      console.log('Removing song:', songId, 'from playlist:', playlistName, 'for user:', userEmail);
  
      const response = await fetch(`http://192.168.1.110:3000/users/${userEmail}/playlists/${encodeURIComponent(playlistName)}/songs/${songId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error removing song:', errorMessage);
        Alert.alert('Error', errorMessage);
        return;
      }
  
      console.log('Song removed successfully');
  
      // Update the user playlists after removing the song
      fetchUserPlaylists();
  
    } catch (error) {
      console.error('Error removing song:', error.message);
      Alert.alert('Error', 'An unexpected error occurred while removing the song.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Playlists</Text>

      <FlatList
  data={userPlaylists}
  keyExtractor={(item) => item.playlistId}
  renderItem={({ item }) => (
    <View style={styles.playlistContainer}>
      <Text style={styles.playlistName}>{item.name}</Text>
      
      <FlatList
        data={item.songs}
        keyExtractor={(song) => song.songId}
        renderItem={({ item: song }) => (
          <TouchableOpacity
            style={styles.songContainer}
            onPress={() => handleRemoveSong(item.name, song.songId)}
          >
            <Text>{song.name} - {song.artist}</Text>
            <Text> {song.songId}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )}
/>
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
  playlistContainer: {
    marginBottom: 16,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  songContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default PlaylistCreationPage2;
