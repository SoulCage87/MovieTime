import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';

// Ya se conecta a la api sin embargo no logro que al dar slide cambie de movie.

const Bienvenida = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
          params: {
            include_adult: false,
            include_video: false,
            language: 'en-US',
            page: 1,
            sort_by: 'popularity.desc',
          },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUzN2ZjMjlmYmJmOTVhODgxZTE1ZGJhOGRhZmFkNyIsInN1YiI6IjY2NjI3MTcxODBlOWQxNzJhMzA5Yjc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.snOffmVYlzh4biznarc9S5jjjjGSOzuaM0wi7m_jd_w',
          },
        });

        setMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Swiper style={styles.swiper}>
        {movies.map(movie => (
          <View key={movie.id} style={styles.slide}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
             
              style={styles.image}
            />
            <Text style={styles.text}>{movie.title}</Text>
            <Text style={styles.text}>Puntuación: {movie.vote_average}/10</Text>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {
    width: '100%',
    height: '85%',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Bienvenida;