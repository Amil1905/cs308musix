/* eslint-disable prettier/prettier */
// EventList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with your chosen icon library // make sure to install expo or react-native-vector-icons

const isValidDate = (dateString) => {
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate) && parsedDate.toString() !== 'Invalid Date';
};

const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const email = props.route?.params?.item;

  useEffect(() => {
    // Function to fetch events from Ticketmaster API
    const fetchEvents = async () => {
      try {
        const ticketmasterApiKey = 'lCzYFUcF7aweDdHDYzlzyvaW4L6RGLUj';
        const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

        const queryParams = new URLSearchParams({
          apikey: ticketmasterApiKey,
          keyword: 'concert',
          // Add other necessary parameters as needed
        });

        const url = `${apiUrl}?${queryParams.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        // Update the state with the fetched events
        setEvents(data._embedded.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    // Call the fetchEvents function
    fetchEvents();
  }, []); 

  return (
    <View style={styles.container}>
      <Image source={require('./events.png')} style={[styles.backgroundImage, ]} />

            {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{`Event List`}</Text>
      </View>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
        <View style={styles.eventContainer}>
          <View style={styles.eventDetails}>
            <Image
              source={require('./event.jpg')} // Replace 'eventImage.jpg' with the actual image file name
              style={styles.eventImage}
            />
            <View style={styles.textDetails}>
              <Text style={styles.eventName}>{item?.name}</Text>
              <View style={styles.iconContainer}>
                <Text style={styles.eventDate}>
                  {isValidDate(item.date) ? new Date(item.date).toLocaleDateString() : 'Date not available'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        )}
      />

      {/* Bottom Bar (Always displayed) */}
      <View style={styles.bottomBar}>
  <TouchableOpacity style={styles.tabButton} 
    onPress={() => props.navigation.navigate('MainPage', { item: email })}>
    <Text style={styles.tabButtonText}>Home</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tabButton}
    onPress={() => props.navigation.navigate('Explore', { item: email })}>
    <Text style={styles.tabButtonText}>Explore</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tabButton}
    onPress={() => props.navigation.navigate('Library', { item: email })}>
    <Text style={styles.tabButtonText}>Library</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.tabButton}
    onPress={() => props.navigation.navigate('Profile', { item: email })}>
    <Text style={styles.tabButtonText}>Profile</Text>
  </TouchableOpacity>
</View>

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
    opacity: 0.8, // Adjust the opacity as needed
  },
  header: {
    backgroundColor: '#222222',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  eventContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the alpha value (0.0 to 1.0) for the desired opacity
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  eventDate: {
    color: '#333333',
    marginBottom: 4,
  },
  eventVenue: {
    color: '#777',
  },
  eventDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 8,
  },
  textDetails: {
    flex: 1,
    flexDirection: 'column',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    marginRight: 8,
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
});

export default EventList;