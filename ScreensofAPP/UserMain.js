/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const UserMain = (props) => {
  const userEmail = props.route.params.item;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.1.102:3000/users/${userEmail}?populate=friends.friendId,songsAdded.songId`);
        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  return (
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      <View style={styles.header}>
        <Text style={styles.headerText}>Added Songs</Text>
      </View>
      {user ? (
        <View>
          <Text  style={styles.songTitles}>User Email: {user.email}</Text>

          <Text style={styles.songTitless}>Songs Added:</Text>
          <FlatList
            data={user.songsAdded}
            keyExtractor={(song) => song.songId._id}
            renderItem={({ item }) => <Text style={styles.songTitle}>{item.songId.name}</Text>}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
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
    //opacity: 0.25, // Adjust the opacity as needed
  },
  header: {
    backgroundColor: '#222222',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#333333',
    padding: 10,
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  recoButton: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  recoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)', // Slightly visible border
  },
  tabButton: {
    alignItems: 'center',
  },
  tabButtonText: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
  },

  buttonContainer: {
    backgroundColor: '#333333', 
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center', // Center the button horizontally
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  songTitle:{
    color:'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  songTitles:{
    color:'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  songTitless:{
    color:'black',
    fontSize: 17,
    fontWeight: 'bold'
  }
});


export default UserMain;
