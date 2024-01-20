/* eslint-disable prettier/prettier */
// MusicFriendsPage.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet, Image, ScrollView} from 'react-native';

const MusicFriendsPage = (props) => {
  const [users, setUsers] = useState([]);
  const [friendEmail, setFriendEmail] = useState('');
  const userEmail = props.route.params.item;

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Make a request to your API endpoint to get all users
      const response = await fetch('http://192.168.1.110:3000/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleAddFriend = async () => {
    // Implement logic to add friend using the provided friendEmail
    try {
      // Make a request to your API endpoint to add a friend
      const response = await fetch('http://192.168.1.110:3000/api/users/addfriends', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail, friendEmail }),
      });

      const data = await response.json();
      console.log(data.message); // Log the response message
      // You may want to update the users list after adding a friend
      fetchUsers();
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Friends</Text>
      </View>


      
      <View style={styles.addarea}>
          <Text style={styles.text}>Add Friend by Email:</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter friend's email"
            value={friendEmail}
            onChangeText={text => setFriendEmail(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleAddFriend}>
            <Text style={styles.buttonText}>Add Friend</Text>
          </TouchableOpacity>
      </View>
        
      <Text style={styles.allusers}>All Users</Text>

      <ScrollView style={styles.content}>
        {users.map(user => (
          <View key={user._id}>
            <Text style={styles.mail}>{user.email}</Text>
          </View>
        ))}

        
      </ScrollView>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Your Musix, Your Rules.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    position: 'relative',
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
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  addarea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#333333',
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 80,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#333333',
    marginBottom: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: {
    width: '80%',
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
  content : {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  allusers: {
    color: '#333333',
    marginBottom: 5,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 2, 
  },
  mail: {
    borderBottomWidth: 1, 
    borderBottomColor: '#000',
    paddingVertical: 5, 
    width: '100%',
    textAlign: 'center',
    fontWeight:"bold",
    color:"black"
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

export default MusicFriendsPage;
