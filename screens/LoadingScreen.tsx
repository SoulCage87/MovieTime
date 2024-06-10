import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';


const LoadingScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const handleLoginScreen = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={styles.container}>
            <Image source={require('./images/logo.png')}  />
            <Text style={styles.demo}>Loading</Text>
            <Button title="Ir" onPress={handleLoginScreen} />
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F78790',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '95%',
        height: 10,
        aspectRatio: 4,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop:0,
    },
    demo: {
        fontSize: 14,
        color:"white",
        fontWeight: 'light',
        marginBottom: 20,
      },
      button: {
        backgroundColor: 'transparent', 
        borderWidth: 1,
        borderColor: 'white', 
        padding: 10,
        borderRadius: 5,
      },
});

export default LoadingScreen;