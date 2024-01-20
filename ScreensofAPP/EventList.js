/* eslint-disable prettier/prettier */
// EventList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Function to fetch events from Ticketmaster API
    const fetchEvents = async () => {
      try {
        const ticketmasterApiKey = 'lCzYFUcF7aweDdHDYzlzyvaW4L6RGLUj';
        const apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';

        const queryParams = new URLSearchParams({
          apikey: ticketmasterApiKey,
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
    <View>
      <Text>Event List</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            {/* Add other event details as needed */}
          </View>
        )}
      />
    </View>
  );
};

export default EventList;
