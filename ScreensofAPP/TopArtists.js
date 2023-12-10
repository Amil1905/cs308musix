/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const TopArtists = (props) => {
  const [topArtists, setTopArtists] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showGraph, setShowGraph] = useState(false);

  const fetchTopArtists = async () => {
    const userEmail = props.route.params.item;

    try {
      const response = await fetch(
        `http://192.168.1.103:3000/api/user/${userEmail}/top-artists?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTopArtists(data);
      setShowGraph(true); // Show the graph after fetching data
    } catch (error) {
      console.error('Error fetching top artists data:', error);
    }
  };

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text>{`${item.artist}: ${item.count} songs`}</Text>
    </View>
  );

  const renderGraph = () => (
    <BarChart
      data={topArtists.map((item) => ({ value: item.count, label: item.artist }))}
      barWidth={22}
      // Other props for customization
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Artists Statistics</Text>

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

      <Button title={showGraph ? 'Show List' : 'Show Graph'} onPress={fetchTopArtists} />

      {showGraph ? renderGraph() : (
        <FlatList
          data={topArtists}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 10,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
});

export default TopArtists;
