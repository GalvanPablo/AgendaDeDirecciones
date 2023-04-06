import React, { useState, useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import MapView, { Marker } from 'react-native-maps'

const MapScreen = ({ navigation }) => {
    
    const initialRegion = {
        latitude: -34.7,
        longitude: -58.3,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }
    
    const [selectedLocation, setSelectedLocation] = useState()

    const handleSelectLocation = event => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude
        })
    }
    
    const handleSave = () => {
        // console.log('Guardando ubicación...')
        if(selectedLocation){
            // console.log('Ubicación guardada')
            navigation.navigate('Nuevo', { mapLocation: selectedLocation })
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={{ marginRight: 10 }} onPress={handleSave}>
                    <FontAwesome name="check" size={24} color={selectedLocation ? 'white' : 'gray'} />
                </TouchableOpacity>
            )
        })
    }, [navigation, handleSave])

    return (
        <MapView
            initialRegion={initialRegion}
            style={styles.container}
            provider='google'
            onPress={handleSelectLocation}
        >
            {selectedLocation && 
                <Marker
                    title='Ubicación Seleccionada'
                    coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
                    // onPress={()=>{console.log('Marker pressed')}}
                />
            }
        </MapView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default MapScreen
