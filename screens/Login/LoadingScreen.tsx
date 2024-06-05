import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const LoadingScreen = () => {
  return (
    <View>
      <Text>LoadingScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#F78790',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: '95%',
        height: undefined,
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

export default LoadingScreen