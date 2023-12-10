/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const UploadSongsPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });

      // Display the selected file
      console.log(result);
      setSelectedFile(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const uploadFile = async () => {
    try {
      if (!selectedFile) {
        console.warn('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      const response = await fetch('http://192.168.1.103:3000/api/songs/batch', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 10000,
      });

      const data = await response.json();
      console.log('Upload response:', data);

      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickDocument} style={styles.pickButton}>
        <Text style={styles.buttonText}>Pick a JSON File</Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.selectedFileText}>{selectedFile.name}</Text>
      )}

      <TouchableOpacity onPress={uploadFile} style={styles.uploadButton}>
        <Text style={styles.buttonText}>Upload File</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickButton: {
    backgroundColor: '#3498db',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedFileText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default UploadSongsPage;
