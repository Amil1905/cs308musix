/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const StatisticsScreen = (props) => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const fetchChartData = async () => {
    const userEmail = props.route.params.item;

    try {
      const response = await fetch(
        `http://192.168.1.103:3000/api/user/${userEmail}/top-albums?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
      setShowGraph(true); // Show the graph after fetching data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`${item.album}: Average Rating - ${item.averageRating}`}</Text>
    </View>
  );

  const renderGraph = () => (
    <BarChart
      data={data.map((item) => ({ value: item.averageRating, label: item.album }))}
      barWidth={22}
      // Other props for customization
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Albums</Text>

      <View style={styles.inputContainer}>
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

      <Button title={showGraph ? 'Show List' : 'Show Graph'} onPress={fetchChartData} />

      {showGraph ? renderGraph() : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderListItem}
        />
      )}
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
    flexDirection: 'row', // Display inputs in a row
    justifyContent: 'space-between', // Add space between inputs
    marginBottom: 10,
  },
  input: {
    flex: 1, // Take up available space
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 10, // Add some margin between inputs
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});

export default StatisticsScreen;
