import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const MovieDetail = ({route, navigation}) => {

  const { movie } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>Puntuación: {movie.vote_average}/10</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const {width} = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 16,
      alignItems: 'center',
    },
    image: {
        width: width * 0.6, // Ajustar el ancho para que sea más estrecho
        height: 300, // Ajustar la altura para que sea más alto
        marginBottom: 16,
        borderRadius: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
    },
    backButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#007BFF',
      borderRadius: 5,
    },
    backButtonText: {
      color: '#fff',
      fontSize: 18,
    },
  });

export default MovieDetail