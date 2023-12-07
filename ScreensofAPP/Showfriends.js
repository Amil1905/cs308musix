/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';

const FriendsScreen = (props) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userEmail = props.route.params.item; // replace with the actual user email
        const response = await fetch(`http://192.168.1.106:3000/api/users/${userEmail}/friends`);
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
          </View>
        )}
      />
    </View>
  );
};

export default FriendsScreen;
