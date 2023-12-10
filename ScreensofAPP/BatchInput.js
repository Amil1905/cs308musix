/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import axios from 'axios';



const BatchInput = (props) => {
    const [selectedFile, setSelectedFile] = useState(null);
  
    const pickDocument = async () => {
      try {
        const result = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
  
        console.log(result);
  
        setSelectedFile(result);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker
        } else {
          throw err;
        }
      }
    };
  
    const uploadFile = async () => {
      if (!selectedFile) {
        alert('Please select a file to upload.');
        return;
      }
    
      const userEmail = props.route.params.item; // Replace with your logic to get the user's email
    
      const formData = new FormData();
      formData.append('file', {
        type: selectedFile.type,
        name: selectedFile.name,
      });
      formData.append('userEmail', userEmail);
    
      try {
        const response = await axios.post(
          'http://192.168.1.103:3000/api/songs/batch',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
    
        if (response.status === 201) {
          console.log('Success:', response.data);
          alert('File uploaded successfully.');
        } else {
          console.error('Error:', response.data);
          alert('An error occurred while uploading the file.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while uploading the file.');
      }
    };
  
    return (
      <View>
        <Text>{selectedFile ? selectedFile.name : 'No file selected'}</Text>
        <Button title="Pick Document" onPress={pickDocument} />
        <Button title="Upload File" onPress={uploadFile} />
      </View>
    );
  };
export default BatchInput;
