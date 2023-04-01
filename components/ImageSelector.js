import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import * as ImagePicker from 'expo-image-picker'

import { Button } from 'react-native-elements'

const ImageSelector = ({ onImage }) => {

    const [pickedUri, setPickedUri] = useState()

    const verifyPermissions = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()

        if (status !== 'granted') {
            Alert.alert(
                'Permisos insuficientes',
                'Necesitas dar permisos para usar la cámara',
                [{ text: 'Ok' }]
            )
            return false
        }
        return true
    }

    const handlerTakeImage = async () => {
        const isCameraOk = await verifyPermissions()
        if (!isCameraOk) return

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.8,
        })

        const image = result.assets[0].uri

        setPickedUri(image)
        onImage(image)
    }

    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                {!pickedUri
                    ? <Text>No hay imagen seleccionada...</Text>
                    : <Image style={styles.image} source={{uri: pickedUri}} />
                }
            </View>
            <Button
                title="Tomar foto"
                onPress={handlerTakeImage}
            />
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    }
})