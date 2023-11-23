/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';


const Dashboard = () => {
  const [startDate, setStartDate] = useState(0); 
  const [endDate, setEndDate] = useState(0);

  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
    } else if (type === 'end') {
      setEndDate(value);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.headerText}>musiX</Text>
      </View>

      <View style={styles.title}>
        <Text> </Text>
        <Text style={styles.title}>Dashboard </Text>
      </View>

      <View style={styles.overview}>
        <Text style={styles.overviewText}>Total Songs: </Text>
      </View>

      <View style={styles.statistics}>
        {/* Place for statistical data */}
      </View>

      <ScrollView style={styles.songList}>
        {/* Display list of songs */}
      </ScrollView>

      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} 
            // eslint-disable-next-line no-trailing-spaces
            placeholder="Key Words" 
            placeholderTextColor="#fff"
          />
      </View>

      <View style={styles.dateRangePicker}>
        <TextInput
          style={styles.dateInput}
          placeholder="Start Date"
          keyboardType="numeric"
          placeholderTextColor="#fff"
          onChangeText={(value) => handleDateChange('start', parseInt(value))}
        />
        <TextInput
          style={styles.dateInput}
          placeholder="End Date"
          keyboardType="numeric"
          placeholderTextColor="#fff"
          onChangeText={(value) => handleDateChange('end', parseInt(value))}
        />
      </View>

      <View style={styles.requestSection}>
        <TextInput style={styles.requestInput} 
            placeholder="Request statistical data"
            placeholderTextColor="#fff"
         />
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.buttonText}>Request</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.notifications}>
      </View>

      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
  },
  header: {
    backgroundColor: 'green',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
  },
  title: {
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 10,
    color: "#fff"
  },
  overviewText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#fff"
  },
  statistics: {
    marginBottom: 20,
  },
  songList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  requestSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  requestInput: {
    flex: 1,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  requestButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateRangePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  notifications: {
  },
  settingsButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});

export default Dashboard;
