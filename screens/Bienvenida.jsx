import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

const Bienvenida = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

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

  const fetchTopRatedMovies = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
        params: {
          language: 'en-US',
          page: 1,
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUzN2ZjMjlmYmJmOTVhODgxZTE1ZGJhOGRhZmFkNyIsInN1YiI6IjY2NjI3MTcxODBlOWQxNzJhMzA5Yjc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.snOffmVYlzh4biznarc9S5jjjjGSOzuaM0wi7m_jd_w',
        },
      });

      setTopRatedMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTopRatedMovies();
  }, []);

  const renderSwiper = (movies, title) => (
    <View style={styles.swiperContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <SwiperFlatList style={styles.swiper} showsPagination={true} loop={true} autoplay={false}>
        {movies.map((movie) => (
          <View key={movie.id} style={styles.slide}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
              style={styles.image}
            />
            <Text style={styles.text}>{movie.title}</Text>
            <Text style={styles.text}>Puntuación: {movie.vote_average}/10</Text>
          </View>
        ))}
      </SwiperFlatList>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {renderSwiper(movies, 'Popular Movies')}
      {renderSwiper(topRatedMovies, 'Top Rated Movies')}
    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  swiperContainer: {
    width: '100%',
    height: 300, 
    marginBottom: 20,
  },
  swiper: {
    width: '100%',
    height: '100%',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9DD6EB',
  },
  image: {
    width: width * 0.8,
    height: 200,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    paddingLeft: 10,
  },
});

export default Bienvenida;


