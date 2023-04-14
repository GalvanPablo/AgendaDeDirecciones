import React from 'react'
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import * as Location from 'expo-location'
import MapPreview from './MapPreview'

const LocationService = ({ onLocation }) => {
    const navigation = useNavigation()
    const route = useRoute()

    const [location, setLocation] = React.useState(null)

    const verifyPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            alert('No se puede acceder a la ubicación')
            return false
        }
        return true
    }

    const getLocation = async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000
        })

        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
        onLocation(location.coords.latitude, location.coords.longitude)
    }

    const pickOnMap = async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return

        navigation.navigate('Map')
    }

    const mapLocation = route.params?.mapLocation
    React.useEffect(() => {
        if (mapLocation) {
            setLocation(mapLocation)
            onLocation(mapLocation.lat, mapLocation.lng)
        }
    }, [mapLocation])

    return (
        <View style={styles.container}>
            <Text>Ubicación</Text>
            <MapPreview location={location} mapStyle={styles.preview}>
                <View>
                    <ActivityIndicator size='large' color='black' />
                    <Text>Esperando a obtener ubicación...</Text>
                </View>
            </MapPreview>
            <View style={styles.actions}>
                <Button title='Obtener Ubicación' onPress={getLocation}/>
                <Button title='Elejir en el mapa' onPress={pickOnMap}/>
            </View>
        </View>
    )
}

export default LocationService

const styles = StyleSheet.create({
    container: {
        marginBottom:10
    },
    preview:{
        width: '100%',
        height: 200,
        marginBottom:10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})