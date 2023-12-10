/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  // ... (your existing styles)
});

const SongPage = (props, { navigation }) => {
  const [selectedType, setSelectedType] = useState('name'); // Default type is 'name'
  const [songValue, setSongValue] = useState('');
  const email = props.route.params.item;

  const handleDelete = async () => {
    try {
      // Validate input fields
      if (!selectedType || !songValue) {
        Alert.alert('Error', 'Please select a type and enter a value.');
        return;
      }

      const apiUrl = `http://172.25.144.1:3000/api/users/${email}/songs`;
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          [selectedType]: songValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      Alert.alert('Song Deleted', 'The specified song has been deleted successfully.');

      // Clear input fields
      setSongValue('');
    } catch (error) {
      console.error('Error deleting song:', error);
      Alert.alert('Error', 'An error occurred while deleting the song.');
    }
  };

  return (
    <View style={styles.container}>
      {/* ... (your existing JSX) */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Choose Type:</Text>
        <Picker
          style={styles.picker}
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
        >
          <Picker.Item label="Name" value="name" />
          <Picker.Item label="Artist" value="artist" />
          <Picker.Item label="Album" value="album" />
        </Picker>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</Text>
        <TextInput
          style={styles.input}
          placeholder={`Enter ${selectedType} ${selectedType !== 'name' ? 'name' : ''}`}
          placeholderTextColor="#F0F0F0"
          value={songValue}
          onChangeText={(text) => setSongValue(text)}
        />
      </View>

      <Button
        title="Delete Song"
        onPress={handleDelete}
        style={styles.button}
        color="#1DB954"
      />

      {/* ... (your existing JSX) */}
    </View>
  );
};

export default SongPage;
