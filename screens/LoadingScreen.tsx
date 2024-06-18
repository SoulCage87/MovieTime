import { NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Button, Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

const LoadingScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const handleLoginScreen = () => {
        navigation.navigate('LoginScreen');
    };

    const waitingTime = 5000;

    useEffect(() => {
        setTimeout(handleLoginScreen, waitingTime);
    }, [])

    const logo = require('./images/logo.png')

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}  />
            <ActivityIndicator size="large" color='red'></ActivityIndicator>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 55,
        height: 100,
        aspectRatio: 4,
        marginBottom: 10,
        alignSelf: 'center',
    },
});

export default LoadingScreen;