import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleLogin = () => {
      // pendiente la validacion de inicio de sesion
      if (correo && password) {
        navigation.navigate('Bienvenida');
      } else {
        setErrorMessage('Por favor, ingrese su correo y contraseña.');
      }
    };

    useEffect(()=> {
     let timer: NodeJS.Timeout;
     if(errorMessage) {
        timer = setTimeout(() => setErrorMessage(''), 3000);
     }
     return () => clearTimeout(timer);
    }, [errorMessage])


  return (
    <View style={styles.container}>
      <Text style={styles.demo}>DEMO</Text>
      <Image style={styles.logo} />
      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={correo}
          onChangeText={setCorreo}
        />
        <TextInput
          style={styles.input}
          placeholder="Clave"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.boton} onPress={handleLogin}>
          <Text style={styles.textoBoton}>Entrar</Text>
        </TouchableOpacity>
        <Text style={styles.ErrorText}>{errorMessage}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white', //fondo
      alignItems: 'center',
      justifyContent: 'center',
    },
    demo: {
      fontSize: 24,
      color: 'black', // Texto negro para "DEMO"
      marginBottom: 20,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      marginBottom: 20,
      aspectRatio: 4,
      alignSelf: 'center',
      backgroundColor: 'transparent',
    },
    loginContainer: {
      width: '95%',
      height:'69%',
      backgroundColor: '#084E85', // Fondo para el contenedor de inicio de sesión
      borderTopLeftRadius: 50, // Borde redondeado solo en la esquina superior izquierda
      borderBottomLeftRadius: 30, // Borde redondeado solo en la esquina inferior izquierda
      padding: 20,
      alignItems: 'baseline',
    },
    input: {
      width: '80%',
      padding: 10,
      marginVertical: 20,
      borderWidth: 1,
      backgroundColor:'#d3d3d3',
      alignSelf:'center',
      borderColor: 'gray',
      borderRadius: 15, // Bordes ligeramente redondeados para los campos de texto
    },
    
    boton: {
      backgroundColor: '#6495ed',
      width:'80%', 
      padding: 15,
      marginTop: 20,
      alignSelf:'center',
      borderRadius: 15, // Bordes ligeramente redondeados para el botón
    },
    textoBoton: {
      color: 'white', 
      fontWeight: 'bold',
      textAlign: 'center',
    },
    ErrorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 30
    }
  });

export default LoginScreen