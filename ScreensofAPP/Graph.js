/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList,Button } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
const Graphs = (props) => {
    const [performers, setPerformers] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [graphData, setGraphData] = useState(null);
    const [error, setError] = useState(null);
  
    const fetchData = async () => {
      const userEmail = props.route.params.item;
  
      try {
        const response = await fetch(
          `http://192.168.1.103:3000/api/user/${userEmail}/performer-song-counts?performers=${performers}&startDate=${startDate}&endDate=${endDate}`
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
  
        console.log('API Response:', data); // Log the response
  
        if (typeof data !== 'object' || data === null) {
          throw new Error('Invalid data format received');
        }
  
        // Convert the object to an array of { performer, count } objects
        const dataArray = Object.entries(data).map(([performer, count]) => ({
          performer,
          count,
        }));
  
        setGraphData(dataArray);
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setGraphData(null);
        setError('Error fetching data. Please check your input and try again.');
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Performer Song Counts</Text>
  
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Performers (comma-separated)"
            value={performers}
            onChangeText={setPerformers}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
          />
          <TextInput
            style={styles.input}
            placeholder="End Date (YYYY-MM-DD)"
            value={endDate}
            onChangeText={setEndDate}
          />
        </View>
  
        <Button title="Show Graph" onPress={fetchData} />
  
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : graphData ? (
          <BarChart
            data={graphData.map((item) => ({ value: item.count, label: item.performer }))}
            barWidth={22}
            // Other props for customization
          />
        ) : null}
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    inputContainer: {
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
  });

export default Graphs;