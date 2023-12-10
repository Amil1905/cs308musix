/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const Main = (props) => {
  const [selectedFilePath, setSelectedFilePath] = useState(null);

  const handleFileSelection = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      console.log('File selection result:', result);
  
      if (result && result.length > 0) {
        // Access the first item in the array
        const selectedFile = result[0];
        setSelectedFilePath(selectedFile.uri);
        console.log('Selected file path:', selectedFile.uri);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('File selection cancelled');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };
  const userEmail = props.route.params.item;
  

  const uploadFileToServer = async () => {
    try {
      if (!selectedFilePath) {
        Alert.alert('Error', 'Please select a file before uploading.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', { uri: selectedFilePath, name: 'file' });
      formData.append('userEmail', userEmail);
  
      const response = await fetch('http://172.25.144.1:3000/api/songs/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      // Handle the response...
    } catch (error) {
      console.error('Error handling file:', error);
      Alert.alert('Error', 'Failed to upload file. Please try again.');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Batch Data Upload Area */}
      <View style={styles.batchUpload}>
        <Text style={styles.batchUploadTitle}>Choose a file to upload</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            console.log('Select File button pressed');
            handleFileSelection();
          }}
        >
          <Text style={styles.uploadButtonText}>Select File</Text>
        </TouchableOpacity>

        {/* Display selected file path if available */}
        {selectedFilePath && (
          <View style={styles.selectedFileContainer}>
            <Text style={styles.selectedFileText}>Selected File Path:</Text>
            <Text style={styles.selectedFilePath}>{selectedFilePath}</Text>
          </View>
        )}

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            console.log('Upload button pressed');
            uploadFileToServer();
          }}
        >
          <Text style={styles.submitButtonText}>Upload</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#343434',
    justifyContent: 'center',
    alignItems: 'center',
  },
  batchUpload: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '15%', 
    padding: 20,
    backgroundColor: '#404040',
    borderRadius: 15,
    width: '80%',
  },
  batchUploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  uploadButton: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'green',
    borderRadius: 15,
    padding: 40, 
    alignItems: 'center',
    marginBottom: 20, 
  },
  uploadButtonText: {
    fontSize: 20,
    color: 'white',
  },
  selectedFileContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  selectedFileText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  selectedFilePath: {
    fontSize: 16,
    color: 'white',
  },
  submitButton: {
    backgroundColor: 'green',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    color: "white",
  },
});

export default Main;
