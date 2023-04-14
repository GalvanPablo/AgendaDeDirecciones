import { ADD_PLACE, LOAD_PLACES } from './places.actions'

import Place from '../models/Place'

const initialState = {
    places: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id,
                action.payload.title,
                action.payload.image,
                action.payload.address,
                action.payload.location
            )
            return {
                places: state.places.concat(newPlace)
            }
        case LOAD_PLACES:
            return {
                places: action.payload.map(pl => new Place(
                    pl.id.toString(),
                    pl.title,
                    pl.image,
                    pl.address,
                    { lat: pl.lat, lng: pl.lng }
                ))
            }
        default:
            return state
    }
}