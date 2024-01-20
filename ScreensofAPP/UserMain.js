/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const UserMain = (props) => {
  const userEmail = props.route.params.item;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://192.168.1.110:3000/users/${userEmail}?populate=friends.friendId,songsAdded.songId`);
        const data = await response.json();

        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  return (
    <View>
      {user ? (
        <View>
          <Text>User Email: {user.email}</Text>

          <Text>Friends:</Text>
          <FlatList
            data={user.friends}
            keyExtractor={(friend) => friend.friendId._id}
            renderItem={({ item }) => <Text>{item.friendId.email}</Text>}
          />

          <Text>Songs Added:</Text>
          <FlatList
            data={user.songsAdded}
            keyExtractor={(song) => song.songId._id}
            renderItem={({ item }) => <Text>{item.songId.name}</Text>}
          />
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default UserMain;
