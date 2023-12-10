/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import RNFS from 'react-native-fs';

const ExportSongsPage = () => {
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [customArtist, setCustomArtist] = useState('');
  const [customRating, setCustomRating] = useState('');

  const handleExportByArtist = async () => {
    try {
      const url = `http://172.25.144.1:3000/api/export/songs/artist?artist=${encodeURIComponent(artist)}`;
      const response = await fetch(url, { method: 'GET' });

      if (response.ok) {
        const jsonData = await response.json();
        const fileName = `songs-${artist}.json`;
        const filePath = RNFS.DownloadDirectoryPath + '/' + fileName;

        await RNFS.writeFile(filePath, JSON.stringify(jsonData), 'utf8');
        Alert.alert('Success', 'File downloaded successfully.');
      } else {
        console.error('Export failed:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to export songs. Please try again.');
      }
    } catch (error) {
      console.error('Error exporting songs by artist:', error);
      Alert.alert('Error', 'Failed to export songs. Please try again.');
    }
  };

  const handleExportByAlbum = async () => {
    try {
      const url = `http://172.25.144.1:3000/api/export/songs/album?album=${encodeURIComponent(album)}`;
      const response = await fetch(url, { method: 'GET' });
  
      if (response.ok) {
        const jsonData = await response.json();
        const fileName = `songs-${album}.json`;
        const filePath = RNFS.DownloadDirectoryPath + '/' + fileName;
  
        await RNFS.writeFile(filePath, JSON.stringify(jsonData), 'utf8');
        Alert.alert('Success', 'File downloaded successfully.');
      } else {
        console.error('Export failed:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to export songs. Please try again.');
      }
    } catch (error) {
      console.error('Error exporting songs by album:', error);
      Alert.alert('Error', 'Failed to export songs. Please try again.');
    }
  };
  
  const handleExportByDateRange = async () => {
    try {
      const url = `http://172.25.144.1:3000/api/export/songs/release-date?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
      const response = await fetch(url, { method: 'GET' });
  
      if (response.ok) {
        const jsonData = await response.json();
        const fileName = `songs-${startDate}-to-${endDate}.json`;
        const filePath = RNFS.DownloadDirectoryPath + '/' + fileName;
        await RNFS.writeFile(filePath, JSON.stringify(jsonData), 'utf8');
        Alert.alert('Success', 'File downloaded successfully.');
      } else {
        console.error('Export failed:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to export songs. Please try again.');
      }
    } catch (error) {
      console.error('Error exporting songs by date range:', error);
      Alert.alert('Error', 'Failed to export songs. Please try again.');
    }
  };

  const handleExportByCustomFilter = async () => {
    try {
      const url = `http://172.25.144.1:3000/api/export/songs/custom-filter?artist=${encodeURIComponent(customArtist)}&rating=${encodeURIComponent(customRating)}`;
      const response = await fetch(url, { method: 'GET' });
  
      if (response.ok) {
        const jsonData = await response.json();
        const fileName = `songs-${customArtist}-rating-${customRating}.json`;
        const filePath = RNFS.DownloadDirectoryPath + '/' + fileName;
        await RNFS.writeFile(filePath, JSON.stringify(jsonData), 'utf8');
        Alert.alert('Success', 'File downloaded successfully.');
      } else {
        console.error('Export failed:', response.status, response.statusText);
        Alert.alert('Error', 'Failed to export songs. Please try again.');
      }
    } catch (error) {
      console.error('Error exporting songs by custom filter:', error);
      Alert.alert('Error', 'Failed to export songs. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Export Songs Page</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter artist name"
        value={artist}
        onChangeText={setArtist}
      />
      <Button title="Export by Artist" onPress={handleExportByArtist} />

      <TextInput
        style={styles.input}
        placeholder="Enter album name"
        value={album}
        onChangeText={setAlbum}
      />
      <Button title="Export by Album" onPress={handleExportByAlbum} />

      <TextInput
        style={styles.input}
        placeholder="Enter start date (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter end date (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <Button title="Export by Date Range" onPress={handleExportByDateRange} />

      <TextInput
        style={styles.input}
        placeholder="Enter artist name for custom filter"
        value={customArtist}
        onChangeText={setCustomArtist}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter rating for custom filter"
        value={customRating}
        onChangeText={setCustomRating}
      />
      <Button title="Export by Custom Filter" onPress={handleExportByCustomFilter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
});

export default ExportSongsPage;
