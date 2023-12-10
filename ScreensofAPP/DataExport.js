/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
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
      const url = `http://192.168.1.103:3000/api/export/songs/artist?artist=${encodeURIComponent(artist)}`;
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
      const url = `http://192.168.1.103:3000/api/export/songs/album?album=${encodeURIComponent(album)}`;
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
      const url = `http://192.168.1.103:3000/api/export/songs/release-date?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
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
      const url = `http://192.168.1.103:3000/api/export/songs/custom-filter?artist=${encodeURIComponent(customArtist)}&rating=${encodeURIComponent(customRating)}`;
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
        <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

        {/* Header (Always displayed) */}
        <View style={styles.header}>
            <Text style={styles.headerText}>Export Songs</Text>
        </View>


        <ScrollView style={styles.content}>
        <View style={styles.exportarea}>
            <Text style={styles.text}></Text>
            <TextInput
                style={styles.input}
                placeholder="Enter artist name"
                value={artist}
                onChangeText={setArtist}
            />

            <TouchableOpacity style={styles.button} onPress={handleExportByArtist}>
                <Text style={styles.buttonText}>Export by Artist</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Enter album name"
                value={album}
                onChangeText={setAlbum}
            />

            <TouchableOpacity style={styles.button} onPress={handleExportByAlbum}>
                <Text style={styles.buttonText}>Export by Album</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Enter start date (YYYY-MM-DD)"
                value={startDate}
                onChangeText={setStartDate}
            />
            <TextInput
                style={styles.input2}
                placeholder="Enter end date (YYYY-MM-DD)"
                value={endDate}
                onChangeText={setEndDate}
            />

            <TouchableOpacity style={styles.button} onPress={handleExportByDateRange}>
                <Text style={styles.buttonText}>Export by Date Range</Text>
            </TouchableOpacity>

            <TextInput
                style={styles.input}
                placeholder="Enter artist name for custom filter"
                value={customArtist}
                onChangeText={setCustomArtist}
            />
            <TextInput
                style={styles.input2}
                placeholder="Enter rating for custom filter"
                value={customRating}
                onChangeText={setCustomRating}
            />

            <TouchableOpacity style={styles.button} onPress={handleExportByCustomFilter}>
                <Text style={styles.buttonText}>Export by Custom Filter</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>

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
    exportarea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    text: {
        color: '#333333',
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: 80,
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderWidth: 1.5,
        borderColor: '#333333',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    input2: {
        width: '80%',
        height: 50,
        borderWidth: 1.5,
        borderColor: '#333333',
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    content : {
        flex: 1,
      },
    scrollView: {
        flex: 1,
    },
    button: {
        width: '80%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
export default ExportSongsPage;
