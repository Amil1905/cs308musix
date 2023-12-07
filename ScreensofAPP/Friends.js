/* eslint-disable prettier/prettier */
// MusicFriendsPage.js

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';

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
      const response = await fetch('http://192.168.1.106:3000/api/users');
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
      const response = await fetch('http://192.168.1.106:3000/api/users/addfriends', {
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
      <Text>All Users</Text>
      {users.map(user => (
        <View key={user._id}>
          <Text>{user.email}</Text>
        </View>
      ))}

      <Text>Add Friend by Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter friend's email"
        value={friendEmail}
        onChangeText={text => setFriendEmail(text)}
      />

      <Button title="Add Friend" onPress={handleAddFriend} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});

export default MusicFriendsPage;
