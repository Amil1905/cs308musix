/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfilePage = (props) => {
    const email = props.route?.params?.item;



    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image source={require('./hp.jpg')} style={styles.backgroundImage} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>{`Your musiX Profile`}</Text>
            </View>

            {/* Profile Picture */}
            <Image source={require('./pp.jpg')} style={styles.profilePicture} />

            {/* User Information */}
            <View style={styles.userInfo}>
                <Text style={styles.userEmail}>{`${email}`}</Text>
            </View>

            {/* Additional User Details */}
            <View style={styles.additionalDetails}>
                <TouchableOpacity onPress={() => props.navigation.navigate('UserMain', { item: email })}>
                    <View style={styles.detailItem}>
                        <Image source={require('./music.png')} style={{ width: 24, height: 24 }} />
                        <Text style={styles.detailText}>Songs Added</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate('Showfriends', { item: email })}>
                    <View style={styles.detailItem}>
                        <Image source={require('./friends.png')} style={{ width: 24, height: 24 }} />
                        <Text style={styles.detailText}>Friends</Text>
                    </View>
                </TouchableOpacity>

            </View>


            {/*Buttons */}

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => props.navigation.navigate('Friends', { item: email })}
            >
                <Text style={styles.logoutButtonText}>Add Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => props.navigation.navigate('Login', { item: email })}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>

          {/* Bottom Bar (Always displayed) */}
          <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.tabButton} 
            onPress={() => props.navigation.navigate('MainPage', { item: email })}>
      
              <Text style={styles.tabButtonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabButton} 
            onPress={() => props.navigation.navigate('Explore', { item: email })}>
      
              <Text style={styles.tabButtonText}>Explore</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabButton}
            onPress={() => props.navigation.navigate('Library', { item: email })}>
             
              <Text style={styles.tabButtonText}>Library</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.tabButton}
            onPress={() => props.navigation.navigate('Profile', { item: email })}>
        
              <Text style={styles.tabButtonText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: 0.75
    },
    header: {
      backgroundColor: '#222222',
      padding: 20,
      alignItems: 'center',
    },
    headerText: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: 'bold',
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
        alignSelf: 'center', // Center the image horizontally
        marginTop: 70, // Adjust the marginTop as needed
    },
    userInfo: {
        marginBottom: 20,
        alignSelf: 'center', // Center the text horizontally
    },
    userEmail: {
        fontSize: 16,
        color: '#666666',
    },
    additionalDetails: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        width: '100%',
        alignSelf: 'center', // Center the row horizontally
    },
    detailItem: {
        alignItems: 'center',
    },
    detailText: {
        marginTop: 5,
        color: '#333333',
    },
    logoutButton: {
        backgroundColor: '#333333',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignSelf: 'center', // Center the button horizontally
        marginTop: 10,
        width: 200, 
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.2)', // Slightly visible border
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tabButton: {
        alignItems: 'center',
    },
    tabButtonText: {
        color: 'white',
        fontSize: 12,
        marginTop: 2,
    },
});

export default ProfilePage;
