/* eslint-disable prettier/prettier */
// LastMonthStats.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const LastMonthStats = (props) => {
  const [dailySongCounts, setDailySongCounts] = useState([]);

  useEffect(() => {
    // Fetch data from the API using the provided email
    const fetchLastMonthStats = async () => {
      try {
        const userEmail = props.route.params.item;// Assuming the email is passed through navigation params
        const response = await fetch(`http://192.168.1.102:3000/api/users/songsAddedLastMonth/${userEmail}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDailySongCounts(data);
      } catch (error) {
        console.error('Error fetching last month stats:', error);
      }
    };

    fetchLastMonthStats();
  }, []); // Run effect when the email changes

  const renderGraph = () => (
    <View style={styles.graphContainer}>
      <BarChart
        data={Object.entries(dailySongCounts).map(([date, count]) => ({ value: count, label: date }))}
        barWidth={22}
        // Other props for customization
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Last Month Stats</Text>
      {renderGraph()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default LastMonthStats;
