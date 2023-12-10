/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet} from 'react-native';

const FriendsScreen = (props) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userEmail = props.route.params.item;
        const response = await fetch(`http://172.25.144.1:3000/api/users/${userEmail}/friends`);
        const data = await response.json();

        if (response.ok) {
          setFriends(data.friends);
        } else {
          setError(data.message || 'Something went wrong');
        }

        setLoading(false);
      } catch (error) {
        setError('Network error');
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const deleteFriendHandle = async (friendEmail) => {
    try {
      const userEmail = props.route.params.item;
      const response = await fetch(`http://172.25.144.1:3000/api/users/${userEmail}/friends/${friendEmail}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ friendEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        // Friend deleted successfully, update the state
        setFriends((prevFriends) => prevFriends.filter((friend) => friend.email !== friendEmail));
        Alert.alert('Success', 'Friend deleted successfully.');
      } else {
        Alert.alert('Error', data.message || 'Failed to delete friend. Please try again.');
      }
    } catch (error) {
      setError('Network error');
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Text>Friends List:</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View>
            <Text>Email: {item.email}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteFriendHandle(item.email)}
            >
              <Text style={{ color: 'white' }}>Delete Friend</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default FriendsScreen;
