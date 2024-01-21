/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Button, TouchableOpacity, Image } from 'react-native';
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
        `http://192.168.1.102:3000/api/user/${userEmail}/top-albums?startDate=${startDate}&endDate=${endDate}`
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
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

        {/* Header (Always displayed) */}
        <View style={styles.header}>
            <Text style={styles.headerText}>Top Albums</Text>
        </View>

        <Text style={styles.text}>You can explore top album statistics:</Text>

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

      <TouchableOpacity style={styles.button} onPress={fetchChartData}>
        <Text style={styles.buttonText}>{showGraph ? 'Show List' : 'Show Graph'}</Text>
      </TouchableOpacity>

      {showGraph ? renderGraph() : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderListItem}
        />
      )}

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
  inputContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    marginRight: 10,
    borderWidth: 1.5,
    borderColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  button: {
    width: '95%',
    height: 40,
    borderRadius: 5,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom:20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  graphContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20, // Add margin for spacing
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
export default StatisticsScreen;
