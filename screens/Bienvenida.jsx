import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Carousel } from 'react-native-snap-carousel';

const { width: viewportWidth } = Dimensions.get('window');

const Bienvenida = () => {
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    fetchMovies();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
          style={styles.image}
        />
        <Text style={styles.text}>{item.title}</Text>
        <Text style={styles.text}>Puntuación: {item.vote_average}/10</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {movies.length > 0 ? (
        <Carousel
          data={movies}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth * 0.8}
        />
      ) : (
        <Text>Cargando...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 400,
    padding: 10,
    marginLeft: 25,
    marginRight: 25,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '80%',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Bienvenida;
