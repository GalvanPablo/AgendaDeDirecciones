export const ADD_PLACE = 'ADD_PLACE'


export const addPlace = (title) => {
    console.log('Titulo: ', title)
    return { type: ADD_PLACE, payload: {title}}
}