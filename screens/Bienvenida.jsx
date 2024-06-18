import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

const Bienvenida = () => {
  const [movies, setMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inCinema, setInCinema] = useState([]);
  const [search, setSearch] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [likedMovies, setLikedMovies] = useState([]);  


  const fetchRequestToken = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/authentication/token/new', {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
      });
      return response.data.request_token;
    } catch (error) {
      console.error('Error fetching request token:', error);
    }
  };
  


  const authorizeRequestToken = (requestToken) => {
    const authorizationUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
    
    Linking.openURL(authorizationUrl);
  };

  

  const fetchSessionId = async (requestToken) => {
    try {
      const response = await axios.post('https://api.themoviedb.org/3/authentication/session/new', {
        request_token: requestToken,
      }, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
      });
      return response.data.session_id;
    } catch (error) {
      console.error('Error fetching session id:', error);
    }
  };

  

  const addToWatchlist = async (sessionId, accountId, movieId) => {
    try {
      const response = await axios.post(`https://api.themoviedb.org/3/account/${accountId}/watchlist`, {
        media_type: 'movie',
        media_id: movieId,
        watchlist: true,
      }, {
        params: { session_id: sessionId },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
      });
      console.log('Added to watchlist:', response.data);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };
  
  const likeMovie = async (sessionId, accountId, movieId) => {
    try {
      const response = await axios.post(`https://api.themoviedb.org/3/account/${accountId}/favorite`, {
        media_type: 'movie',
        media_id: movieId,
        favorite: true,
      }, {
        params: { session_id: sessionId },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
      });
      console.log('Added to favorites:', response.data);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };
    
  
 
  const navigation = useNavigation();

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          include_adult: false,
          include_video: false,
          language: 'es-SP',
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
            include_adult: true,
            language: 'es-LA',
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
          language: 'es-LA',
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
          language: 'es-LA',
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
          <View key={movie.id} style={styles.slide}>
            <TouchableOpacity
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
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => addToWatchlist(movie)}>
                <Text style={styles.actionText}>Añadir a la Lista</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => likeMovie(movie)}>
                <Text style={styles.actionText}>Like</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </SwiperFlatList>
    </View>
  );
  
  

  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.searchText}>Busca tu pelicula</Text>
      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch} />
      {searchResults.length > 0
        ? renderSwiper(searchResults, 'Resultados de tu Busqueda')
        : <>
          {renderSwiper(movies, 'Peliculas Populares')}
          {renderSwiper(topRatedMovies, 'Peliculas Mejores Valoradas!')}
          {renderSwiper(inCinema, 'Solo en Cines!')}
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
    backgroundColor: 'black'
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
    backgroundColor: '#121212', //cambio de color 
  },
  image: {
    width: width * 0.6, 
    height: 300, 
    marginBottom: 16,
    borderRadius: 10,
    marginTop: 20,
    margin: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fbff00', // letra amarillo
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    paddingLeft: 10,
    color: '#fbff00', // letra amarillo
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
    color: 'white',
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
  searchText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbff00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#333',
    borderRadius: 5,
    
  }});

export default Bienvenida;


