import { View, Text, FlatList, ScrollView, StyleSheet, Dimensions, Image } from 'react-native'
import React from 'react'

const Likes = ({route}) => {

const {likedMovies} = route.params

  return (
    <ScrollView style={styles.container}>
    <Text style={styles.title}>Likeadas</Text>
    <FlatList
        data={likedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Text>{item.title}</Text>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}` }}
                    style={styles.image} />
            </View>
        )}
    />
</ScrollView>
  )
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center'
    },
    item: {
        backgroundColor: 'black',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,

    },
    image: {
        width: width * 0.6,
        height: 340,
        marginBottom: 16,
        borderRadius: 10,
        marginTop: 20,
        margin: 20,
    }
})

export default Likes