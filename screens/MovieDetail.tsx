import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, ImageBackground, View } from 'react-native';
import { WebView } from 'react-native-webview';


const MovieDetail = ({ route, navigation }) => {

  const { movie } = route.params;
  const [loading, setLoading] = useState(true);
  const [trailerKey, setTrailerKey] = useState('')

  const trailerFetch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/videos`, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUzN2ZjMjlmYmJmOTVhODgxZTE1ZGJhOGRhZmFkNyIsInN1YiI6IjY2NjI3MTcxODBlOWQxNzJhMzA5Yjc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.snOffmVYlzh4biznarc9S5jjjjGSOzuaM0wi7m_jd_w'
        }
      })
      const trailer = response.data.results.find(video => video.type === 'Trailer');
      setTrailerKey(trailer.key);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    trailerFetch();
  }, [movie.id])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}>
        {/*<Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.text}>Puntuación: {movie.vote_average}/10</Text>
        <Text style={styles.text}>{movie.overview}</Text>*/}
        {loading ? (
          <ActivityIndicator size="large" color='red'></ActivityIndicator>
        ) : trailerKey ? (
          <WebView
            style={styles.video}
            source={{ uri: `https://www.youtube.com/embed/${trailerKey}` }}
          />
        ) : (
          <Text style={styles.text}>No hay trailer disponible</Text>
        )}
        {/*<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>*/}
        <View>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.text}>Puntuación: 💛 {movie.vote_average}/10 💛</Text>
          <Text style={styles.text}> {movie.overview}</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    width: width * 0.6,
    height: 300,
    marginBottom: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
    top: 215,
    backgroundColor: 'black',
    borderRadius: 15
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
    backgroundColor: '#1C1614',
    padding: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff4400',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  video: {
    width: width * 0.9,
    height: 200,
    marginVertical: 150,
    marginRight: 40,
    left: 20,
    marginTop: 300

  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
});

export default MovieDetail