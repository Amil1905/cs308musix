/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, TextInput } from 'react-native';

const BlendedPlaylistPage = (props) => {
  const userEmail = props.route.params.item;
  const [friendEmail, setFriendEmail] = useState('');
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://192.168.1.110:3000/api/users/${userEmail}/friends`);
      const data = await response.json();
      console.log(data);
      setFriendsList(data.friends);
    } catch (error) {
      console.error('Error fetching friends:', error.message);
      Alert.alert('Error', 'Failed to fetch friends. Please try again.');
    }
  };

  const createBlendedPlaylist = async () => {
    try {
      const response = await fetch('http://192.168.1.110:3000/api/create-blended-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail1: userEmail,
          userEmail2: friendEmail,
        }),
      });

      const data = await response.json();

      Alert.alert('Success', data.message);
      // Handle the response and navigate to another screen if needed
    } catch (error) {
      console.error('Error creating blended playlist:', error.message);
      Alert.alert('Error', 'Failed to create blended playlist. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Friends:</Text>
      <FlatList
  data={friendsList}
  keyExtractor={(item) => item.email}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => setFriendEmail(item.email)}
    >
      <Text>{item.email}</Text>
    </TouchableOpacity>
  )}
/>

      <Text style={styles.headerText}>Selected Friend: {friendEmail}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter friend's email"
        value={friendEmail}
        onChangeText={(text) => setFriendEmail(text)}
      />

      <TouchableOpacity style={styles.button} onPress={createBlendedPlaylist}>
        <Text style={styles.buttonText}>Create Blended Playlist</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  friendItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
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

export default BlendedPlaylistPage;
