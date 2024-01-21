/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  Image
} from 'react-native';

const PlaylistCreationPage2 = (props) => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [playlistToDelete, setPlaylistToDelete] = useState('');

  useEffect(() => {
    // Fetch user playlists when the component mounts
    fetchUserPlaylists();
  }, []);

  const fetchUserPlaylists = async () => {
    const userEmail = props.route.params.item;

    try {
      const response = await fetch(`http://192.168.1.102:3000/api/users/${userEmail}/playlists`);

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

      const response = await fetch(
        `http://192.168.1.102:3000/users/${userEmail}/playlists/${encodeURIComponent(playlistName)}/songs/${songId}`,
        {
          method: 'DELETE',
        }
      );

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

  const handleDeletePlaylist = async () => {
    const userEmail = props.route.params.item;

    try {
      const response = await fetch(
        `http://192.168.1.102:3000/users/${userEmail}/playlists/${encodeURIComponent(playlistToDelete)}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error deleting playlist:', errorMessage);
        Alert.alert('Error', errorMessage);
        return;
      }

      console.log('Playlist deleted successfully');

      // Update the user playlists after deleting the playlist
      fetchUserPlaylists();

    } catch (error) {
      console.error('Error deleting playlist:', error.message);
      Alert.alert('Error', 'An unexpected error occurred while deleting the playlist.');
    }
  };

  return (
    <View style={styles.container}>
    <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

    <View style={styles.header}>
      <Text style={styles.headerText}>Your Playlists</Text>
    </View>
      

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

      {/* Delete Playlist Section */}
      <View style={styles.deletePlaylistContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter playlist name to delete"
          value={playlistToDelete}
          onChangeText={(text) => setPlaylistToDelete(text)}
        />
             <TouchableOpacity style={styles.button} onPress={handleDeletePlaylist}>
        <Text style={styles.buttonText}>Delete Playlist</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.25, // Adjust the opacity as needed
  },
  header: {
    backgroundColor: '#222222',
    padding: 5,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  playlistContainer: {
    marginBottom: 16,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:25
  },
  songContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deletePlaylistContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#333333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
  },
});

export default PlaylistCreationPage2;