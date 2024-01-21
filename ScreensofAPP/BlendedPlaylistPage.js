/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, FlatList, TextInput, Image } from 'react-native';

const BlendedPlaylistPage = (props) => {
  const userEmail = props.route.params.item;
  const [friendEmail, setFriendEmail] = useState('');
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch(`http://192.168.1.102:3000/api/users/${userEmail}/friends`);
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
      const response = await fetch('http://192.168.1.102:3000/api/create-blended-playlist', {
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
    <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

   <View style={styles.header}>
     <Text style={styles.headerText}>Blended Playlist</Text>
   </View>
   
   <Text style={[styles.friends, {marginTop: 50}]}>Your Friends:</Text>
   

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

      <Text style={styles.headerTexts}>Selected Friend: {friendEmail}</Text>

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
  headerTexts: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
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
    backgroundColor: '#333333',
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
