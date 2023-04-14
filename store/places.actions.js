import * as FileSystem from 'expo-file-system'

import { MAP_KEY } from '../constants/keys'

import { insertAddress, deleteAddress, deleteAllAdresses, fetchAddress } from '../db'

export const ADD_PLACE = 'ADD_PLACE'
export const LOAD_PLACES = 'LOAD_PLACES'
// export const DELETE_PLACE = 'DELETE_PLACE'


export const addPlace = (title, image, location) => async dispatch => {
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
                id: result.insertId,
                title,
                image: Path,
                address,
                location: {
                    lat: location.lat,
                    lng: location.lng
                }
            }
        })
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const loadPlaces = () => async dispatch => {
    try {
        const result = await fetchAddress()
        dispatch({
            type: LOAD_PLACES,
            payload: result.rows._array
        })
    }
    catch (error) {
        throw error
    }
}

export const deletePlace = (id) => async dispatch => {
    try {
        const result = await deleteAddress(id)
        console.log(result)

        if(result.rowsAffected === 0) alert('No se pudo eliminar el lugar')

        dispatch(loadPlaces())
    } catch (error) {
        throw error
    }
}

export const deleteAllPlaces = () => async dispatch => {
    try {
        const result = await deleteAllAdresses()
        console.log(result)

        if(result.rowsAffected === 0) alert('No se han podido eliminar las direcciones')

        dispatch(loadPlaces())
    } catch (error) {
        throw error
    }
}

