/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';

const FriendsScreen = (props) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const userEmail = props.route.params.item;
        const response = await fetch(`http://192.168.1.103:3000/api/users/${userEmail}/friends`);
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
      const response = await fetch(`http://192.168.1.103:3000/api/users/${userEmail}/friends/${friendEmail}`, {
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
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Friends</Text>
      </View>      
      
      <Text style={styles.text}>You can see your friends list:</Text>

      <ScrollView style={styles.content}>

          <FlatList
            data={friends}
            keyExtractor={(item) => item.email}
            renderItem={({ item }) => (

            <TouchableOpacity style={styles.songCard}>
              <View style={styles.songDetails}>
                <Text style={styles.mail}>Email: {item.email}</Text>
              </View>

              <TouchableOpacity style={styles.listenButton} onPress={() => deleteFriendHandle(song._id)}>
                <Text style={styles.listenButtonText}>Delete</Text>
              </TouchableOpacity>
            </TouchableOpacity>
      
            )}
          />
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
text: {
  color: '#333333',
  marginTop: 20,
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  borderBottomWidth: 2, 
  paddingTop: 80,
},
mail: {
  fontSize: 14,
  color: '#333333',
},
content : {
  flex: 1,
},
scrollView: {
  flex: 1,
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
});

export default FriendsScreen;
