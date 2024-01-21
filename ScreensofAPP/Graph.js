/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList,Button, TouchableOpacity, Image } from 'react-native';
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
          `http://192.168.1.102:3000/api/user/${userEmail}/performer-song-counts?performers=${performers}&startDate=${startDate}&endDate=${endDate}`
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
        <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

        {/* Header (Always displayed) */}
        <View style={styles.header}>
            <Text style={styles.headerText}>Performer Song Counts</Text>
        </View>

        <Text style={styles.text}>You can explore performer song counts:</Text>
  
        
          <TextInput
            style={styles.performerinput}
            placeholder="Performers (comma-separated)"
            value={performers}
            onChangeText={setPerformers}
          />
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
  

        <TouchableOpacity style={styles.button} onPress={fetchData}>
            <Text style={styles.buttonText}>Show Graph</Text>
        </TouchableOpacity>

  
        {error ? (
        <Text style={styles.errorText}>{error}</Text>
        ) : graphData ? (
        <View style={styles.graphContainer}>
            <BarChart
            data={graphData.map((item) => ({ value: item.count, label: item.performer }))}
            barWidth={30} // Increase the bar width for a bigger chart
            style={{ borderRadius: 10, backgroundColor: 'white' }} // Set background color to white
            chartConfig={{
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set bar color to black
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set label color to black
            }}
            // Other props for customization
            />
        </View>
        ) : null}
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
    marginTop: 15,
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
  performerinput: {
    width: '95%',
    height: 50,
    borderWidth: 1.5,
    borderColor: '#333333',
    marginTop: 45,
    borderRadius: 10,
    marginLeft: 10,
    paddingHorizontal: 10,
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

export default Graphs;