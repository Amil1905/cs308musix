/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
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
  
      const response = await fetch('http://192.168.1.106:3000/api/songs/batch', {
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
    <View style={styles.container}>
      <Image source={require('./hp.jpg')} style={[styles.backgroundImage, { marginTop: 35 }]} />

      {/* Header (Always displayed) */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Song with Batch Input</Text>
      </View>

        <ScrollView contentContainerStyle={styles.content}>
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
    scrollView: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,

    },
    batchUpload: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: '15%', 
        padding: 20,
        borderRadius: 15,
        width: '80%',
        borderWidth: 2,
        borderColor: '#333333',
    },
    batchUploadTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
    },
    uploadButton: {
        borderWidth: 2,
        borderColor: '#333333',
        borderRadius: 15,
        padding: 40, 
        alignItems: 'center',
        marginBottom: 20, 
        borderStyle: 'dashed',
    },
    uploadButtonText: {
        fontSize: 20,
        color: '#333333',
    },
    selectedFileContainer: {
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#333333',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        borderStyle: 'dashed',
    },
    selectedFileText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333333',
    },
    selectedFilePath: {
        fontSize: 16,
        color: '#333333',
    },
    submitButton: {
        backgroundColor: '#333333',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        color: "white",
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

export default Main;