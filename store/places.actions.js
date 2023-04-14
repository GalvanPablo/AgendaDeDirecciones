import * as FileSystem from 'expo-file-system'

export const ADD_PLACE = 'ADD_PLACE'
import { MAP_KEY } from '../constants/keys'

import { insertAddress } from '../db'


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

            const result = await insertAddress(title, Path, address, location.lat, location.lng)
            console.log(result)

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

            // https://docs.google.com/presentation/d/1yt_Yc7FFSy8xBOVyqNvEdzsJSprE3vOWSc7R93hvOW4/preview?slide=id.gb6a23ffe60_4_0
            // diapositiva 19
        } catch (error) {
            console.log(error.message)
            throw error
        }
    }
}