/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';



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

      const apiUrl = `http://192.168.1.102:3000/api/users/${email}/songs`;
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
        <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

        <View style={styles.header}>
            <Text style={styles.headerText}>Delete Song</Text>
        </View>
    <View style={styles.delarea}>
        <Text style={styles.pickerLabel}>Choose Type:</Text>
        <View style={styles.pickerContainer}>
            <Picker
            style={styles.picker}
            selectedValue={selectedType}
            onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
            itemStyle={styles.pickerItem}
            >
            <Picker.Item label="Name" value="name" color={selectedType === 'name' ? '#000066' : '#333333'}/>
            <Picker.Item label="Artist" value="artist" color={selectedType === 'artist' ? '#000066' : '#333333'}/>
            <Picker.Item label="Album" value="album" color={selectedType === 'album' ? '#000066' : '#333333'} />
            </Picker>
        </View>

        <Text style={styles.label}>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}</Text>
        <View style={styles.column}>
            <TextInput
            style={styles.input}
            placeholder={`Enter ${selectedType} ${selectedType !== 'name' ? 'name' : ''}`}
            value={songValue}
            onChangeText={(text) => setSongValue(text)}
            />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete Song</Text>
          </TouchableOpacity>
      </View>

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
        opacity: 0.15, // Adjust the opacity as needed
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
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
      },
      delarea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      pickerLabel: {
        color: '#333333',
        marginLeft: 10,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: 'bold',
      },
      pickerContainer: {
        width: '80%',
        height: 50,
        borderWidth: 1.5,
        borderColor: '#333333',
        marginBottom: 30,
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
      },
      pickerItem: {
        color: '#333333',
      },
      label: {
        color: '#333333',
        marginLeft: 10,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: 'bold',
      },
      column: {
        width: '80%',
        height: 50,
        borderWidth: 1.5,
        borderColor: '#333333',
        marginBottom: 30,
        borderRadius: 10,
        paddingHorizontal: 10,
        placeholderTextColor: '#333333',
        justifyContent: 'center',
      },
      button: {
        width: '80%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#333333',
        alignItems: 'center',
        justifyContent: 'center',
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

export default SongPage;
