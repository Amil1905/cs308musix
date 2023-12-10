/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { TextInput, Text, TouchableOpacity, StyleSheet, View, Alert, Image } from 'react-native';

function SongInput(props) {
  const [songName, setSongName] = useState('');
  const [artists, setArtists] = useState(['', '', '']);
  const [albumName, setAlbumName] = useState('');
  const [genres, setGenres] = useState(['', '', '']);
  const [releaseDate, setReleaseDate] = useState('');
  const [rating, setRating] = useState('');

  const handleAddSong = async () => {
    if (!songName || !artists[0] || !albumName || !genres[0] || !releaseDate) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      // Assuming you have the user's email from somewhere
      const email= props.route.params.item

      // Step 1: Add the song
      const responseSong = await fetch('http://192.168.1.103:3000/api/songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: songName,
          artist: artists[0],  // Assuming the first artist is the main artist
          album: albumName,
          genre: genres[0],  // Assuming the first genre is the main genre
          releaseDate: releaseDate,
          rating:parseInt(rating),
        }),
      });

      if (!responseSong.ok) {
        console.error('Failed to add song:', responseSong.status, responseSong.statusText);
        // Handle error accordingly
        return;
      }

      const songData = await responseSong.json();
      console.log('Song added successfully:', songData);

      // Step 2: Add the song rating to the user's songsAdded array
      const responseRating = await fetch(`http://192.168.1.103:3000/users/${email}/ratings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          songId: songData._id,  // Assuming the song ID is returned in the response
          rating: parseInt(rating),  // Assuming the rating is a number
        }),
      });

      if (responseRating.ok) {
        const ratingData = await responseRating.json();
        console.log('Rating added successfully:', ratingData);
        // You can handle success, show a message, or navigate to another screen here
      } else {
        console.error('Failed to add rating:', responseRating.status, responseRating.statusText);
        // Handle error accordingly
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error accordingly
    }
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Add Song</Text>
      </View>

      <Text style={styles.text}></Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Song</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter song name"
            placeholderTextColor="#333333"
            value={songName}
            onChangeText={(text) => setSongName(text)}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Artists</Text>
          {artists.map((artist, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Enter artist ${index + 1}${index > 0 ? ' (optional)' : ''}`}
              placeholderTextColor="#333333"
              value={artist}
              onChangeText={(text) => setArtists([...artists.slice(0, index), text, ...artists.slice(index + 1)])}
            />
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Album</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter album name"
            placeholderTextColor="#333333"
            value={albumName}
            onChangeText={(text) => setAlbumName(text)}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Genres</Text>
          {genres.map((genre, index) => (
            <TextInput
              key={index}
              style={styles.input}
              placeholder={`Enter genre ${index + 1}${index > 0 ? ' (optional)' : ''}`}
              placeholderTextColor="#333333"
              value={genre}
              onChangeText={(text) => setGenres([...genres.slice(0, index), text, ...genres.slice(index + 1)])}
            />
          ))}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Release Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#333333"
            value={releaseDate}
            onChangeText={(text) => setReleaseDate(text)}
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Rating (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter rating"
            placeholderTextColor="#333333"
            value={rating}
            onChangeText={(text) => setRating(text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAddSong}>
        <Text style={styles.buttonText}>Add Song</Text>
      </TouchableOpacity>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Your Musix, Your Rules.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.15, // Adjust the opacity as needed
  },
  header: {
    backgroundColor: '#222222',
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    color: '#333333',
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 2, 
    paddingTop: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginBottom: 15,
    width: '100%',
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#333333',
    borderWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#333333',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: '95%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default SongInput;
