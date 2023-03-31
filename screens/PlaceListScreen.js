import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useSelector } from 'react-redux'

const PlaceListScreen = () => {
    const places = useSelector(state => state.places.places)
    console.log(places)
    return (
        <View style={styles.container}>
            <Text>Direcciones</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceListScreen
