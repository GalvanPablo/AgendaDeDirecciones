import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'
import { MAP_KEY } from '../constants/keys'


export const addPlace = (title, image, location) => {
    return async dispatch => {
        // OBTENER DIRECCIÓN
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${MAP_KEY}`)
        if(!response.ok) throw new Error('No se pudo completar la solicitud')
        const data = await response.json()
        if(!data.results) throw new Error('Error al obtener la dirección')
        const address = data.results[0].formatted_address



        // IMAGEN
        const fileName = image.split('/').pop()
        const Path = FileSystem.documentDirectory + fileName

        try {
            FileSystem.moveAsync({
                from: image,
                to: Path
            })
        } catch (error) {
            console.log(error.message)
            throw error
        }

        dispatch({
            type: ADD_PLACE,
            payload: {
                title,
                image: Path,
                address,
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            }
        })
    }
}