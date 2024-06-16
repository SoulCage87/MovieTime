import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useNavigation } from '@react-navigation/native';

const Bienvenida = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inCinema, setInCinema] = useState([]);
  const [search, setSearch] = useState('');
 
  const navigation = useNavigation();

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

  const searchMovie = async () => {
    if (search.length > 0) {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            query: search,
            include_adult: false,
            language: 'en-US',
            page: 1,
          },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUzN2ZjMjlmYmJmOTVhODgxZTE1ZGJhOGRhZmFkNyIsInN1YiI6IjY2NjI3MTcxODBlOWQxNzJhMzA5Yjc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.snOffmVYlzh4biznarc9S5jjjjGSOzuaM0wi7m_jd_w'
          }
        })
        setSearchResults(response.data.results);
      } catch (error) {
        console.error(error.message)
      }
    } else {
      setSearchResults([]);
    }
  }

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

  const fetchCinema = async () => {
     try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
        params:{
          language: 'en-US',
          page: 1,

        },
        headers:{
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWUzN2ZjMjlmYmJmOTVhODgxZTE1ZGJhOGRhZmFkNyIsInN1YiI6IjY2NjI3MTcxODBlOWQxNzJhMzA5Yjc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.snOffmVYlzh4biznarc9S5jjjjGSOzuaM0wi7m_jd_w'
        }
      })
      setInCinema(response.data.results);

     } catch (error) {
      console.error(error.message)
     }
  }

  useEffect(() => {
    fetchMovies();
    fetchTopRatedMovies();
    fetchCinema();
  }, []);

  useEffect(() => {
    searchMovie();
  }, [search])

  const renderSwiper = (movies, title) => (
    <View style={styles.swiperContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <SwiperFlatList style={styles.swiper} showsPagination={true} loop={true} autoplay={false}>
        {movies.map((movie) => (
          <TouchableOpacity
          key={movie.id}
          style={styles.slide}
          onPress={() => navigation.navigate('MovieDetail', { movie })}
        >
          {!movie.poster_path ?
            <Text>Cargando...</Text>
            : <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
              style={styles.image}
            />}
          <Text style={styles.text}>{movie.title}</Text>
          <Text style={styles.text}>Puntuación: {movie.vote_average}/10</Text>
        </TouchableOpacity>
        ))}
      </SwiperFlatList>
    </View>
  );

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder='Search a movie...' />
      {searchResults.length > 0
        ? renderSwiper(searchResults, 'Search Results')
        : <>
          {renderSwiper(movies, 'Popular Movies')}
          {renderSwiper(topRatedMovies, 'Top Rated Movies')}
          {renderSwiper(inCinema, 'Now Playing in Cinema!')}
        </>
      }
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
    height: 450,
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
    width: width * 0.6, 
    height: 300, 
    marginBottom: 16,
    borderRadius: 10,
    marginTop: 20
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
  searchInput: {
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  detailContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  detailImage: {
    width: '80%',
    height: '50%',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  
});

export default Bienvenida;


