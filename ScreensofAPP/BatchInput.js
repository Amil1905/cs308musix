/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Main = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Batch Data Upload</Text>
      </View>

      {/* Batch Data Upload Area */}
      <View style={styles.batchUpload}>
        <Text style={styles.batchUploadTitle}>Choose a file to upload</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            /* file selection functionality */
          }}
        >
          <Text style={styles.uploadButtonText}>Select File</Text>
        </TouchableOpacity>
        
        {/* Submit Button */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            /* submit functionality */
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
  header: {
    backgroundColor: 'green', 
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
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
