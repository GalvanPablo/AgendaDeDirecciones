import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

import * as Location from 'expo-location'

const LocationService = ({ onLocation }) => {

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

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {location ? (
                <Text> {location.lat} , {location.lng}</Text>
                ) : (
                <Text> Esperando ubicación... </Text>
                )}
            </View>
            <Button title='Obtener Location' onPress={getLocation}/>
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
    }
})