import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const Bienvenida = () => {
    return (
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://www.imdb.com/title/tt2049403/mediaviewer/rm1374450177/?ref_=tt_ov_i' }}
                style={styles.image}
            />
            <Text style={styles.text}>Beetlejuice</Text>
            <Text style={styles.text}>Puntuación: 8.0/10</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '90%',
        height: '80%',
        marginBottom: 16,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Bienvenida