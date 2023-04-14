import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { deletePlace } from '../store/places.actions'

import MapPreview from '../components/MapPreview'
import { Button } from 'react-native-elements/dist/buttons/Button'

const PlaceDetailScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()

    const { placeId } = route.params
    const place = useSelector(state => state.places.places.find(place => place.id === placeId))

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{place.title}</Text>
            <Image source={{uri: place.image}} style={styles.image} />
            <Text style={styles.address}>{place.address}</Text>


            <View style={styles.mapPreview}>
                <MapPreview location={{lat: place.location.lat, lng: place.location.lng}}>
                    <Text>No se pudo cargar el mapa</Text>
                </MapPreview>
            </View>

            <Button title='Eliminar Lugar' buttonStyle={styles.btnDelete}  onPress={()=> {
                navigation.goBack()
                dispatch(deletePlace(place.id))
            }}/>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    },
    image: {
        width: '95%',
        height: 200,
    },
    address: {
        marginVertical: 10,
    },
    mapPreview: {
        width: '95%',
        height: 200,
        backgroundColor: 'red'
    },
    btnDelete: {
        marginVertical: 10,
        backgroundColor: '#d00'
    }
})

export default PlaceDetailScreen
