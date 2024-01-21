/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';

const Unratedsongs = (props) => {
  const [unratedSongs, setUnratedSongs] = useState([]);
  const [ratings, setRatings] = useState({});

  const fetchUnratedSongs = async () => {
    try {
      const userEmail = props.route.params.item;
      const response = await fetch(`http://192.168.1.102:3000/users/${userEmail}/unratedSongs`);
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
      const response = await fetch(`http://192.168.1.102:3000/user/${userEmail}/song/${songId}/rate`, {
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
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Unrated Songs</Text>
      </View>

      <ScrollView style={styles.songList}>

        {unratedSongs.map((song) => (
                  <TouchableOpacity key={song._id} style={styles.songCard}>
                  <View style={styles.songDetails}>
                  <Text style={styles.songTitle}>{song.name}</Text>
                    <Text style={styles.songArtist}>Artist: {song.artist}</Text>
                    <Text style={styles.songAlbum}>Album: {song.album}</Text>
    
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
    
                    <TouchableOpacity style={styles.ratingbutton} onPress={() => updateRating(song._id)}>
                      <Text style={styles.listenButtonText}>Rate</Text>
                    </TouchableOpacity>
                      
                    </View>
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
    opacity: 0.25, 
  },
  songCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 10,
  },
  songDetails: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: '#333333',
    fontWeight: 'bold',

  },
  songArtist: {
    fontSize: 14,
    color: '#333333',
  },
  songAlbum: {
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
  ratingContainer: {
    flexDirection: 'column',
    marginTop: 16,
  },
  ratingInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 130,
    marginBottom: 8,
    borderRadius: 5,
    textAlign: 'center',
    color: '#333333',
  },
  ratingbutton: {
    backgroundColor: '#666666',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 130,
  }
});

export default Unratedsongs;
